
import React from 'react';

import {
    Box,
    ChakraProvider,
    Progress,
    Text,
    VStack,
    HStack,
    Button,
    List,
    ListItem,
    ListIcon,
    Grid,
    GridItem,
    Badge,
    extendTheme,
    useColorModeValue,
    CircularProgress,
    CircularProgressLabel,
    Avatar,
    Divider,
    Tag,
} from '@chakra-ui/react';


const Profil = () => {
  return (
    <VStack spacing={2} align="stretch" p={1} borderRadius="md" boxShadow='base' bg="rgba(15, 15, 15)">
      <Avatar align="stretch" size="l" src="/image/pp.jpg" />
      <Text fontSize="l" color="purple">Medhi</Text>
      <Progress value={65} size="sm" colorScheme="purple" />
      <Text fontSize="xs" color="white">65% exp</Text>
      <Text fontSize="xs" color="white">Bonus Actuel: 5% </Text>
    </VStack>

  )
}

export default Profil