'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Input, Text, useToast, VStack, Tag } from '@chakra-ui/react';
import { useWriteContract, useWatchContractEvent } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';

function ProposeGame({ address, onSuccessAddProposal, Events }) {

  useWatchContractEvent({
    address: ContractAddress,
    abi: ContractAbi,
    eventName: 'GameProposed',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  });

  const [proposalDescription, setProposalDescription] = useState('');

  const toast = useToast();

  const { writeContract: ProposeGame, isLoading: isProposalAdding } = useWriteContract({
    mutation: {
      onSuccess() {
        toast({
          title: "Game proposal has been sent.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setProposalDescription('');
        onSuccessAddProposal();
      },
      onError(error) {
        toast({
          title: "Failed to propose a Game.",
          description: error.shortMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      },
    }
  });

  const handleProposalSubmission = () => {
    if (!proposalDescription.trim()) {
      toast({
        title: 'Description cannot be empty.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    ProposeGame({
      address: ContractAddress,
      abi: ContractAbi,
      functionName: "ProposeGame",
      account: address,
      args: [proposalDescription]

    });

  };

  return (
    <Box>
      <VStack spacing={4}>

        <Input
          placeholder="Describe your game proposal"
          value={proposalDescription}
          onChange={(e) => setProposalDescription(e.target.value)}
        />
        <Button colorScheme='whiteAlpha'
          onClick={handleProposalSubmission}
          isLoading={isProposalAdding}
        >
          Propose a game
        </Button>
      </VStack>

    </Box>
  );
}

export default ProposeGame;