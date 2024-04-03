import React, { useState } from 'react';
import { Box, Flex, Input, Button, Textarea, VStack, useToast } from '@chakra-ui/react';
import { useWriteContract } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';

export default function PlayGame() {
  const [message, setMessage] = useState('');
  const [id, setId] = useState('');
  const [messages, setMessages] = useState([]);

  const toast = useToast();

  const { write: MakeChoice, isLoading: isChoiceAdding } = useWriteContract({
    mutation: {
      onSuccess() {
        toast({
          title: 'Choice submitted successfully.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        setMessages([...messages, { id, message }]);
        setMessage(''); // Réinitialiser le message après la soumission
        setId(''); // Réinitialiser l'ID après la soumission
      },
      onError(error) {
        toast({
          title: 'Error submitting choice.',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      },
    },
  });

  const handleChoiceSubmission = async () => {
    if (!message.trim() || !id.trim()) {
      toast({
        title: 'Choice and ID cannot be empty.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    await MakeChoice({
      address: ContractAddress,
      contractAbi: ContractAbi,
      functionName: 'MakeChoice',
      args: [id, message],
    });
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
            <Box key={index} bg="gray.700" p={2} borderRadius="md" width="100%">
              ID: {msg.id}, Message: {msg.message}
            </Box>
          ))}
        </VStack>
        <Box mt="auto">
          <Input
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            mb={2}
          />
          <Textarea
            placeholder="Votre message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            mb={2}
          />
          <Button
            colorScheme='purple'
            variant='outline'
            _hover={{ bg: 'purple.500', color: 'white' }}
            onClick={handleChoiceSubmission}
            isLoading={isChoiceAdding}
          >
            Envoyer
          </Button>
        </Box>
      </Flex>
    </Flex>
  </Flex>
);
}
