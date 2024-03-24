'use client';

import { Flex, Text, Box } from '@chakra-ui/react';
import { ConnectButton, createTheme  } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <Box pos="fixed" top={0} left={0} h="10vh" w="100vw" bg="rgba(0, 0, 0, 0.9)">
      <Flex alignItems="center" justifyContent="space-between" h="100%" px={50}>
        <Text color="white" ml="100px">PlaysDao</Text>
        <ConnectButton 
      
     />
      </Flex>
    </Box>
  );
};

export default Header