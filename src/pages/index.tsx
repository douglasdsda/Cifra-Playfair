import { useColorModeValue } from "@chakra-ui/color-mode";

import { Box, Flex, SimpleGrid, Button, Text, Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import Head from "next/head";
import { useCallback, useState } from "react";

export default function Home() {
  const [textoComum, setTextoComum] = useState("");
  const [valueEncode, setEncode] = useState("");
  const [codigo, setCodigo] = useState("");
  //criptografar
var isChet = false;
var isEnd = false;
var flag = false;
var flagX = false;
var flagAdd = false;

  const handleEncoding = useCallback(() => {
    const texto = cipher();

    setEncode(texto);
  }, [textoComum, codigo]);

  const handleDecoding = useCallback(() => {
    deCodeCipher()
  }, [valueEncode, codigo]);

  function handleClear() {
    setEncode("");
    setCodigo("");
    setTextoComum("");
  }

  function processKey() { 
    var key = codigo;
    key = key.toUpperCase().replace(/\s/g, '').replace(/J/g, "I");
    var result = [];
    let temp = '';
    var alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
    for(var i = 0; i < key.length; i++) {
      if (alphabet.indexOf(key[i]) !== -1) {
        alphabet = alphabet.replace(key[i], '');
        temp += key[i];
      }
    }
    temp += alphabet;
    var result = [];
    let temp2 = temp.split('');
    while(temp2[0]) {
      result.push(temp2.splice(0,5));
    }
    return result;
  }

  function cipher() {
    var keyresult = processKey();
    var res = [];
    var error = 'Warning!!! String is empty';
    var str = textoComum;
    if(str === '') {
      document.getElementById('printValue').innerHTML = error;
    }

    var textPhrase, separator;
    str = str.toUpperCase().replace(/\s/g, '').replace(/J/g, "I");
    if(str.length === 0) {
      }
    else {
      textPhrase = str[0];
    }
    let help = 0; let flagAdd = false;
    for(var i = 1; i < str.length; i++) {
        if(str[i - 1] === str[i]) {
          if(str[i] === 'X') {
            separator = 'Q';
          }
          else {
            separator = 'X';
          }
          textPhrase += separator + str[i];
          help = 1; 
        }
        else {
          textPhrase += str[i];
        }
      if(help === 1) {
        flagAdd = true;
      }
    }
    
    if(textPhrase.length % 2 !== 0) {
      if(textPhrase[textPhrase.length - 1] === 'X') {
        textPhrase += 'Q';
        isEnd = true;
        flagX = false;
      }
      else {
        textPhrase += 'X';
        isEnd = true;
        flagX = true;
      }
    }
    
    var t = [];
    var enCodeStr = '';
    for(var i = 0; i < textPhrase.length; i += 2){
      var pair1 = textPhrase[i];
      var pair2 = textPhrase[i + 1];
      var p1i, p1j, p2i, p2j;
      for(var stroka = 0; stroka < keyresult.length; stroka++) {
        for(var stolbec = 0; stolbec < keyresult[stroka].length; stolbec++){
          if (keyresult[stroka][stolbec] == pair1){
            p1i = stroka;
            p1j = stolbec;
          }
          if (keyresult[stroka][stolbec] == pair2){
            p2i = stroka;
            p2j = stolbec;
          }
        }
      }
      var coord1 = '', coord2 = '';
      
      if(p1i === p2i) {
        if(p1j === 4) {
          coord1 = keyresult[p1i][0];
        }
        else {
          coord1 = keyresult[p1i][p1j + 1];
        }
        if(p2j === 4) {
          coord2 = keyresult[p2i][0];
        }
        else {
          coord2 = keyresult[p2i][p2j + 1]
        }
      }
      if(p1j === p2j) {
        if(p1i === 4) {
          coord1 = keyresult[0][p1j];
        }
        else {
          coord1 = keyresult[p1i + 1][p1j];
        }
        if(p2i === 4) {
          coord2 = keyresult[0][p2j];
        }
        else {
          coord2 = keyresult[p2i + 1][p2j]
        }
      }
      if(p1i !== p2i && p1j !== p2j) {
        coord1 = keyresult[p1i][p2j];
        coord2 = keyresult[p2i][p1j];
      }
      enCodeStr = enCodeStr + coord1 + coord2;
    }

    return enCodeStr;
  }

  function deCodeCipher() {

    var text = '';
    var error = "Warning!!! String is empty";
    var text1 = cipher();
    if(text1 === '') {
      document.getElementById('printDeCode').innerHTML = error;
    }
    var keyresult = processKey();
    for(var i = 0; i < text1.length; i += 2){
      var pair1 = text1[i];
      var pair2 = text1[i + 1];
      var p1i, p1j, p2i, p2j;
      for(var stroka = 0; stroka < keyresult.length; stroka++) {
        for(var stolbec = 0; stolbec < keyresult[stroka].length; stolbec++){
          if (keyresult[stroka][stolbec] == pair1){
            p1i = stroka;
            p1j = stolbec;
          }
          if (keyresult[stroka][stolbec] == pair2){
            p2i = stroka;
            p2j = stolbec;
          }
        }
      }
      var coord1 = '', coord2 = '';
      
      if(p1i === p2i) {
        if(p1j === 0) {
          coord1 = keyresult[p1i][4];
        }
        else {
          coord1 = keyresult[p1i][p1j - 1];
        }
        if(p2j === 0) {
          coord2 = keyresult[p2i][4];
        }
        else {
          coord2 = keyresult[p2i][p2j - 1]
        }
      }
      if(p1j === p2j) {
        if(p1i === 0) {
          coord1 = keyresult[4][p1j]
        }
        else {
          coord1 = keyresult[p1i - 1][p1j];
        }
        if(p2i === 0) {
          coord2 = keyresult[4][p2j];
        }
        else {
          coord2 = keyresult[p2i - 1][p2j]
        }
      }
      if(p1i !== p2i && p1j !== p2j) {
        coord1 = keyresult[p1i][p2j];
        coord2 = keyresult[p2i][p1j];
      }
      text = text + coord1 + coord2;
    }
    let text2 = text.split('');
    
    for(var i = 0; i < text.length; i++) {
      var count;
      if (flagAdd) {
        if(text[i] === text[i + 2] && (text[i + 1] === 'X' || text[i + 1] === 'Q')) {
          count = i + 1;
          text2.splice(count, 1);
        }
      }
      else if(flagAdd && isEnd && (flagX || !flagX)) {
        if(text[i - 2] === text[i] && (text[i - 1] === 'X' || text[i - 1] === 'Q'))
          count = i + 1;
          text2.splice(count, 1);
      }
      else if(!flagAdd) {
        break;
      }
    }
    if(flagX) {
      text2.pop();
    }
    if(isEnd && !flagX) {
      text2.pop();
    }
    let text3 = text2.join('');
   setEncode(text3)
  }

  return (
    <Flex
      as="main"
      minHeight="77vh"
      flexDir="column"
      w="100%"
      my="6"
      maxWidth="1480"
      mx="auto"
      px="6"
    >
      <Head>
        <title>Inicio | Cifra de cesar</title>
        Ok
      </Head>

      <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
        <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
          <Flex flexDir="row" justify="space-between" align="center">
            <Text fontSize="lg" mb="4">
              have
            </Text>
            <Button
              mb="4"
              background="green.500"
              onClick={handleEncoding}
              disabled={!codigo || !textoComum}
            >
              Criptografar
            </Button>
          </Flex>

          <Input
            mb="4"
            placeholder="Digite a chave"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <Text fontSize="lg" mb="4">
            Texto
          </Text>
          <Textarea
            value={textoComum}
            onChange={(e) => setTextoComum(e.target.value)}
            placeholder="Digite o texto aqui..."
            size="sm"
          />

          <Button
            w="100%"
            my="2"
            disabled={!codigo && !valueEncode && !textoComum}
            onClick={handleClear}
            background="gray.400"
          >
            Limpar
          </Button>
        </Box>

        <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
          <Flex flexDir="row" justify="space-between" align="center">
            <Text fontSize="lg" mb="4">
              Texto Criptografado
            </Text>
            <Button
              mb="4"
              background="red.500"
              disabled={!valueEncode}
              onClick={handleDecoding}
            >
              Descriptografar
            </Button>
          </Flex>

          <Textarea
            value={valueEncode}
            placeholder="Digite o texto aqui..."
            size="sm"
            disabled
          />
        </Box>
      </SimpleGrid>
    </Flex>
  );
}
