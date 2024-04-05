'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Input, Text, useToast, VStack, Tag } from '@chakra-ui/react';
import { useWriteContract, useWatchContractEvent } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';


function StartGameSession({ address, Events }) {

  useWatchContractEvent({
    address: ContractAddress, // L'adresse de votre contrat
    abi: ContractAbi, // L'ABI de votre contrat
    eventName: 'GameSessionStarted', // Le nom de l'événement à écouter
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  });

  useWatchContractEvent({
    address: ContractAddress, // L'adresse de votre contrat
    abi: ContractAbi, // L'ABI de votre contrat
    eventName: 'GameStatusChanged', // Le nom de l'événement à écouter
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  });

  const [gameSession, SetgameSession] = useState('');

  const toast = useToast();

  // Voter
  const { writeContract: StartGameSession, isLoading: isGameStart } = useWriteContract({
    mutation: {
      onSuccess() {
        toast({
          title: "Game Started",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        SetgameSession('');

      },
      onError(error) {
        toast({
          title: "Failed to start the game",
          description: error.shortMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  });

  const handleGameSession = () => {
    if (!gameSession.trim()) {
      toast({
        title: 'Choice cannot be empty.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    StartGameSession({
      address: ContractAddress,
      abi: ContractAbi,
      functionName: "StartGameSession",
      account: address,
      args: [gameSession]

    });

  };

  return (
    <Box>
      <VStack spacing={4}>

        <Input
          placeholder="Select an Id"
          value={gameSession}
          onChange={(e) => SetgameSession(e.target.value)}
        />
        <Button colorScheme='whiteAlpha'
          onClick={handleGameSession}
          isLoading={isGameStart}
        >
          Start a Game Session
        </Button>
      </VStack>

    </Box>
  );
}

export default StartGameSession;