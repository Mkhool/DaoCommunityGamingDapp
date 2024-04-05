import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import HelloWorld from './HelloWorld';
export default function NotConnected() {
  return (
<Box
  w="100vw"
  h="100vh"
  bgImage="url('/image/backgroundUQ.jpg')"
  bgPosition="center"
  bgSize="cover"
>
  <Flex h="100vh" alignItems="center" justifyContent="center">
   <HelloWorld />
  </Flex>
</Box>
  );
  
}