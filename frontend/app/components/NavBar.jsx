'use Client'
import { useRouter } from 'next/navigation'; 
import { Box, VStack, Button } from '@chakra-ui/react';
import { FaHome, FaGamepad, FaUsers, FaCog } from 'react-icons/fa';
import Profil from '../DesignPage/Profil';

const SidebarLink = ({ href, label, icon }) => {
  const router = useRouter(); 

  return (
    <Button
      leftIcon={icon}
      justifyContent="flex-start"
      variant="ghost"
      colorScheme="purple"
      width="full"
      _hover={{ bg: '#BFA181' , color: 'black'}} 
      iconSpacing={2}
      fontSize="sm"
      onClick={() => router.push(href)}
      style={{ textDecoration: 'none', borderRadius:"0" }}
    >
      {label}
    </Button>
  );
};

function NavBar() {
  return (
    <Box pos="fixed" top={0} left={0} h="100vh" w="150px" display="flex" bg="rgba(15, 15, 15)">
      <VStack spacing={4} align="stretch" m={2} width="100%">
        <Box>
          <Profil />
        </Box>
        <SidebarLink href="/dashboard" label="Dashboard" icon={<FaHome />} />
        <SidebarLink href="/game" label="Jeux" icon={<FaGamepad />} />
        <SidebarLink href="/dao" label="Dao" icon={<FaUsers />} />
        <SidebarLink href="/Admin" label="Admin" icon={<FaCog />} />
      </VStack>
    </Box>
  );
}

export default NavBar;
