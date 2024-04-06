
import React from 'react';
import {
    Progress,
    Text,
    VStack,
    Avatar,
} from '@chakra-ui/react';
import Exp from '../user/Exp';
import Rank from '../user/Rank';
import { useState } from "react";
import { useAccount } from "wagmi";


const Profil = () => {
  const { address: userAddress } = useAccount();
  const [exp, setExp] = useState(); 

  return (
    <VStack spacing={2} align="stretch" p={1} borderRadius="md" boxShadow='base' bg="rgba(15, 15, 15)">
      <Avatar align="stretch" size="l" src="/image/ppBadge.png"/>
  
      <Text fontSize="sm" color="#BFA181" as="b">O'Clock</Text>
      <Progress value={(exp / 1000) * 100} size="sm" colorScheme="purple" />

      <Rank color="#178582"/>
      <Exp  color="#BFA181" exp={exp}/>
    </VStack>

  )
}

export default Profil