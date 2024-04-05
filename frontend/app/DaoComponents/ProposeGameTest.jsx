'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Input, Text, useToast, VStack , Tag, Alert, AlertIcon  } from '@chakra-ui/react';
import { useWriteContract, useWatchContractEvent, useWaitForTransactionReceipt  } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';

function ProposeGameTest({ address, onSuccessAddProposal }) {

 useWatchContractEvent({
    address: ContractAddress, // L'adresse de votre contrat
    abi: ContractAbi, // L'ABI de votre contrat
    eventName: 'GameProposed', // Le nom de l'événement à écouter
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  });

  const [proposalDescription, setProposalDescription] = useState('');

  const toast = useToast();

  // Écrire une nouvelle proposition
  const { writeContract: ProposeGame, isLoading: isProposalAdding,  data: hash } = useWriteContract({
    mutation: {
      onSuccess() {
        toast({
          title: "Game proposal has been sent.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        // setProposalDescription('');
        // onSuccessAddProposal();
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

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
  useWaitForTransactionReceipt({ 
    hash, 
  }) 

  useEffect(() => {
      if(isConfirmed) {
          // refetch la balance
          // refetch()
          // // refetch les events
          // getEvents();
        
          toast({
              title: "Transaction is done",
              status: "success",
              duration: 3000,
              isClosable: true,
          });
      }
  }, [isConfirmed])

  return (
<Box>
  <VStack spacing={4}>
  {/* {isConfirmed 
            &&  <Alert mt="1rem" status='success'>
                    <AlertIcon />
                    Your transaction has been confirmed
                </Alert>} */}
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

export default ProposeGameTest;