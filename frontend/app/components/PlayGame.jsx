import React, { useState } from 'react';
import { Box, Flex, Input, Button, Textarea, VStack, useToast } from '@chakra-ui/react';
import { useWriteContract, useWatchContractEvent } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';
import OwnerChoice from '../Admin/OwnerChoice';

export default function PlayGame({ address, onSuccessMakechoice }) {

  useWatchContractEvent({
    address: ContractAddress, // L'adresse de votre contrat
    abi: ContractAbi, // L'ABI de votre contrat
    eventName: 'ChoiceMade', // Le nom de l'événement à écouter
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  });

  const [messages, setMessages] = useState([]);
  const [proposalDescription, setProposalDescription] = useState('');
  const [SessionId, setSessionId] = useState('');
  const toast = useToast();

  const { writeContract: MakeChoice, isLoading: isProposalAdding } = useWriteContract({
    mutation: {
      onSuccess() {
        toast({
          title: "Direction has been sent.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setProposalDescription('');
        onSuccessMakechoice();
      },
      onError(error) {
        toast({
          title: "Failed to send direction.",
          description: error.shortMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  });

  const handleProposalSubmission = () => {
    if (!proposalDescription.trim() ||!SessionId.trim()) {
      toast({
        title: 'Description cannot be empty.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const sessionIdNumber = parseInt(SessionId, 10);

    if (isNaN(sessionIdNumber)) {
      toast({
        title: 'Invalid Session ID',
        description: 'Session ID must be a number.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    if (!proposalDescription.trim()) {
      toast({
        title: 'Description cannot be empty.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    MakeChoice({
      address: ContractAddress,
      abi: ContractAbi,
      functionName: "MakeChoice",
      account: address,
      args: [sessionIdNumber, proposalDescription]
    });
  };

return (


  <Flex height="calc(100vh - 30px)" alignItems="center" justifyContent="center" marginLeft="100px">
    <Flex width="calc(80vw - 10px)" height="calc(40vw - 30px)" bg="gray.800" borderRadius="lg" overflow="hidden">
      <Box flex="3" bg="black" display="flex" alignItems="center" justifyContent="center">
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
            placeholder="Session ID"
            value={SessionId}
            onChange={(e) => setSessionId(e.target.value)}
            mb={2}
          />
          <Textarea
            placeholder="Direction"
            value={proposalDescription}
            onChange={(e) => setProposalDescription(e.target.value)}
            mb={2}
          />
          <Button
            colorScheme='purple'
            variant='outline'
            _hover={{ bg: 'purple.500', color: 'white' }}
            onClick={handleProposalSubmission}
            isLoading={isProposalAdding}
          >
            Envoyer
          </Button>
        </Box>
        <Box flex="1" bg="black" display="flex" alignItems="center" justifyContent="center">
          <OwnerChoice/>
        </Box>
      </Flex>
    </Flex>
  </Flex>
);
}
