'use client';
import { Flex, Text, Box, Avatar, AvatarBadge, Image } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from "wagmi";
import Link from 'next/link';

const Header = () => {
  
  const { isConnected } = useAccount();
  return isConnected ? (
    <Box pos="fixed" top={0} left={0} h="10vh" w="100vw" bg="rgba(15, 15, 15)">
      <Flex alignItems="center" justifyContent="space-between" h="100%" px={50}>
        <Box flex={1}></Box>
        <Box flex={2} textAlign="center" mt='10'>
          <Link href="/dashboard" passHref>
            <Image src="/image/BannerName.png" alt="Banner" mx="auto" maxWidth="200px" maxHeight="28vh" />
          </Link>
        </Box>
        <ConnectButton />
      </Flex>
    </Box>
  ) : (
    <Box pos="fixed" top={0} left={0} h="10vh" w="100vw" bg="rgba(15, 15, 15)">
      <Flex alignItems="center" justifyContent="space-between" h="100%" px={50}>
        <Box flex={1}></Box>
        <Box flex={2} textAlign="center" mt='10'>
          <Link href="/dashboard" passHref>
          </Link>
        </Box>
        <ConnectButton />
      </Flex>
    </Box>
  );
};

export default Header;