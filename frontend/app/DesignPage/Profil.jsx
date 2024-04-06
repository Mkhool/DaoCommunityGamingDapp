
import React from 'react';
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
import Rank from '../user/Rank';
import { useState } from "react";
import { useAccount } from "wagmi";


const Profil = () => {


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

      <Rank color="#178582"/>
      <Image src="/image/Diamond.png" alt="Banner" mx="auto" maxWidth="100px" maxHeight="10vh"  />
      
    </VStack>

  )
}

export default Profil