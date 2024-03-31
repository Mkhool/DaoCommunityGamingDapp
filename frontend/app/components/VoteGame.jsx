'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Input, Text, useToast, VStack , Tag } from '@chakra-ui/react';
import { useWriteContract, useWatchContractEvent } from 'wagmi';
import { DaoContractAddress, DaoContractAbi } from '@/constants';


function VoteGame({ address, onSuccessAddProposal, Events }) {

 useWatchContractEvent({
    address: DaoContractAddress, // L'adresse de votre contrat
    abi: DaoContractAbi, // L'ABI de votre contrat
    eventName: 'GameProposalAccepted', // Le nom de l'événement à écouter
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  });

  useWatchContractEvent({
    address: DaoContractAddress, // L'adresse de votre contrat
    abi: DaoContractAbi, // L'ABI de votre contrat
    eventName: 'GameProposalAccepted', // Le nom de l'événement à écouter
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  });
  
  const [voteFrorGame , serVoteFrorGame] = useState('');

  const toast = useToast();

  // Voter
  const { writeContract: VoteForGame, isLoading: isVoteAdding } = useWriteContract({
    mutation: {
      onSuccess() {
        toast({
          title: "Vote submitted.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        serVoteFrorGame('');
        onSuccessAddProposal();
      },
      onError(error) {
        toast({
          title: "Failed to vote for a game",
          description: error.shortMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  });

  const handleVoteSubmission = () => {
    if (!voteFrorGame .trim()) {
      toast({
        title: 'Choice cannot be empty.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    VoteForGame({
      address: DaoContractAddress,
      abi: DaoContractAbi,
      functionName: "VoteForGame",
      account: address,
      args: [voteFrorGame ]
      
    });

  };

  return (
<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" width="100vw">
  <VStack spacing={4}>
    
    <Input
      placeholder="Select an Id"
      value={voteFrorGame }
      onChange={(e) => serVoteFrorGame(e.target.value)}
    />
    <Button
      onClick={handleVoteSubmission}
      isLoading={isVoteAdding}
    >
      Vote for a Game
    </Button>
  </VStack>
 
</Box>
  );
}

export default VoteGame;