
import {
    Progress,
    Text,
    VStack,
    Avatar,
    Image,
    HStack,
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview
} from '@chakra-ui/react';
import Exp from '../user/Exp';
import { useAccount } from 'wagmi';
import React, { useState, useEffect } from 'react';



const Profil = () => {
  const { address: userAddress } = useAccount();
  const [exp, setExp] = useState(0); 

  
  useEffect(() => {
    
    const fetchUserExperience = async () => {
      
      const userExp = "Nouvelle Expérience";
      setExp(userExp);
    };

    fetchUserExperience();
  }, [userAddress]);

  return (
    <VStack spacing={2} align="stretch" p={1} borderRadius="md" boxShadow='base' bg="rgba(15, 15, 15)">
      <Avatar align="stretch" size="l" src="/image/ppBadge.png"/>

<HStack justifyContent="space-between" width="100%">
  <Text fontSize="sm" color="#BFA181" as="b">
  <Editable defaultValue="O'Clock">
  <EditablePreview />
  <EditableInput />
</Editable>

    </Text>
    <Exp color="#BFA181" />
</HStack>

      <Progress value={45} size="sm" colorScheme="purple" />
     
    </VStack>

  )
}

export default Profil