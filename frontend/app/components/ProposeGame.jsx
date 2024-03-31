'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Input, Text, useToast, VStack , Tag } from '@chakra-ui/react';
import { useWriteContract, useWatchContractEvent } from 'wagmi';
import { DaoContractAddress, DaoContractAbi } from '@/constants';

function ProposeGame({ address, onSuccessAddProposal, Events }) {

 useWatchContractEvent({
    address: DaoContractAddress, // L'adresse de votre contrat
    abi: DaoContractAbi, // L'ABI de votre contrat
    eventName: 'GameProposed', // Le nom de l'événement à écouter
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  });

  const [proposalDescription, setProposalDescription] = useState('');

  const toast = useToast();

  // Écrire une nouvelle proposition
  const { writeContract: ProposeGame, isLoading: isProposalAdding } = useWriteContract({
    mutation: {
      onSuccess() {
        toast({
          title: "Proposal added successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setProposalDescription('');
        onSuccessAddProposal();
      },
      onError(error) {
        toast({
          title: "Failed to add proposal.",
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
      address: DaoContractAddress,
      abi: DaoContractAbi,
      functionName: "ProposeGame",
      account: address,
      args: [proposalDescription]
      
    });

  };

  useEffect(() =>{

  }, [Events])

  return (
<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" width="100vw">
  <VStack spacing={4}>
    <Tag>Add a new proposal</Tag>
    <Input
      placeholder="Describe your proposal"
      value={proposalDescription}
      onChange={(e) => setProposalDescription(e.target.value)}
    />
    <Button
      onClick={handleProposalSubmission}
      isLoading={isProposalAdding}
    >
      Add Proposal
    </Button>
  </VStack>
 
</Box>
  );
}

export default ProposeGame;