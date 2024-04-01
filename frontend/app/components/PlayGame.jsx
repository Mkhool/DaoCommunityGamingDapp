import React from 'react'
import ChatBox from './ChatBox'

// pages/index.js ou pages/[votrePage].js
import { useState } from 'react';
import { Box, Flex, Input, Button, Textarea, VStack  } from '@chakra-ui/react';

export default function PlayGame() {
  const [message, setMessage] = useState('');
  const [id, setId] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageSubmit = () => {
    // Logique pour gérer l'envoi de message et d'ID ici
    // Par exemple, ajouter le message et l'ID à un tableau de messages ou envoyer à un smart contract
    console.log({ message, id }); // Placeholder pour votre logique
    setMessages([...messages, { id, message }]);
    setMessage(''); // Réinitialiser le message après l'envoi
  };

  return (
    <Flex height="calc(100vh - 30px)" alignItems="center" justifyContent="center" marginLeft="140px" marginTop="30px">
    <Flex width="calc(80vw - 10px)" height="calc(45vw - 30px)" bg="gray.800" borderRadius="lg" overflow="hidden">
      <Box flex="3" bg="black" display="flex" alignItems="center" justifyContent="center">
        {/* Lecteur vidéo ou streaming ici */}
        Zone de Streaming
      </Box>
      <Flex flex="1" flexDirection="column" bg="#2c3e50" p={4}>
        <VStack spacing={2} overflowY="auto" flex="1">
          {messages.map((msg, index) => (
            <Box key={index} bg="(gray.700)" p={2} borderRadius="md" width="100%">
              ID: {msg.id}, Message: {msg.message}
            </Box>
          ))}
        </VStack>
        <Box mt="auto">
          <Textarea
            placeholder="Votre message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            mb={2}
          />
          <Input
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            mb={2}
          />
          <Button 
                    colorScheme='purple' 
                    variant='outline' 
                    _hover={{ bg: 'purple.500', color: 'white' }}
          onClick={handleMessageSubmit} isFullWidth>
            Envoyer
          </Button>
        </Box>
      </Flex>
    </Flex>
  </Flex>
);
}