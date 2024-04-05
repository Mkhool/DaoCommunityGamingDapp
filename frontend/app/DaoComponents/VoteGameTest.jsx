'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Input, Text, useToast, VStack , Tag } from '@chakra-ui/react';
import { useWriteContract, useWatchContractEvent, useWaitForTransactionReceipt } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';


function VoteGame({ address, onSuccessAddProposal, Events }) {

 useWatchContractEvent({
    address: ContractAddress, // L'adresse de votre contrat
    abi: ContractAbi, // L'ABI de votre contrat
    eventName: 'GameProposalAccepted', // Le nom de l'événement à écouter
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  });
 
  const [voteFrorGame , serVoteFrorGame] = useState('');

  const toast = useToast();

  // Voter
  const { writeContract: VoteForGame, isLoading: isVoteAdding, data: hash } = useWriteContract({
    mutation: {
      onSuccess() {
        toast({
          title: "Vote submitted.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        serVoteFrorGame('');
        
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
      address: ContractAddress,
      abi: ContractAbi,
      functionName: "VoteForGame",
      account: address,
      args: [voteFrorGame ]
      
    });

  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
  useWaitForTransactionReceipt({ 
    hash, 
  }) 

  useEffect(() => {
      if(isConfirmed) {

          toast({
              title: "Vote validated",
              status: "success",
              duration: 3000,
              isClosable: true,
          });
      }
  }, [isConfirmed])


  return (
<Box>
  <VStack spacing={4}>
    
    <Input
      placeholder="Select an Id"
      value={voteFrorGame }
      onChange={(e) => serVoteFrorGame(e.target.value)}
    />
    <Button colorScheme='whiteAlpha'
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