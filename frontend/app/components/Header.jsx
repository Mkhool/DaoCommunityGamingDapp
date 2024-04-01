'use client';

import { Flex, Text, Box, Avatar, AvatarBadge  } from '@chakra-ui/react';
import { ConnectButton  } from '@rainbow-me/rainbowkit';

const Header = () => {
  return (
    <Box pos="fixed" top={0} left={0} h="10vh" w="100vw" bg="rgba(15, 15, 15, 0.95)">
      <Flex alignItems="center" justifyContent="space-between" h="100%" px={50}>
        <Text color="#BFA181" ml="100px" fontSize='xl' as='b'>UnityQuest</Text>
        <Avatar size="md" left={400} src="/image/pp.jpg">
        <AvatarBadge boxSize='1em' bg='green.500' />
        </Avatar>
        <ConnectButton 
     />
      </Flex>
    </Box>
  );
};

export default Header