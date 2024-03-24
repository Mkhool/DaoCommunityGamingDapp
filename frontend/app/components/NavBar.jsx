'use Client'
import { Box, VStack, Button, Link, HStack, Text } from '@chakra-ui/react';
import { FaHome, FaGamepad, FaUsers, FaCog } from 'react-icons/fa';
// import Link from 'next/link';
import Profil from './Profil';

const SidebarLink = ({ href, label, icon }) => (
  <Link href={href} passHref _hover={{ textDecoration: 'none' }}>
    <Button
      as="a"
      leftIcon={icon}
      justifyContent="flex-start"
      variant="ghost"
      colorScheme="purple"
      width="full"
      _hover={{ bg: 'purple.500', color: 'black' }}
      iconSpacing={2}
      fontSize="sm"
    >
      {label}
    </Button>
  </Link>
);

function NavBar() {
  return (
    <Box pos="fixed" top={0} left={0} h="100vh" w="150px" display="flex" bg="rgba(0, 0, 0, 0.9)">
      <VStack spacing={4} align="stretch" m={2} width="100%">
        <Box>
          <Profil />
        </Box>
        <SidebarLink href="/dashboard" label="Dashboard" icon={<FaHome />} />
        <SidebarLink href="/game" label="Game" icon={<FaGamepad />} />
        <SidebarLink href="/dao" label="DAO" icon={<FaUsers />} />
        <SidebarLink href="/settings" label="Settings" icon={<FaCog />} />
      </VStack>
    </Box>
  );
}

export default NavBar;
