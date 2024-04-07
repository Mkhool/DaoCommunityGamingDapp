'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Input, Text, useToast, VStack , Tag, Alert, AlertIcon  } from '@chakra-ui/react';
import { useWriteContract, useWatchContractEvent, useWaitForTransactionReceipt  } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';

function ProposeGameTest({ address, onSuccessAddProposal }) {

//  useWatchContractEvent({
//     address: ContractAddress, 
//     abi: ContractAbi, 
//     eventName: 'GameProposed', 
//     onLogs(logs) {
//       console.log('New logs!', logs)
//     },
//   });

  const [proposalDescription, setProposalDescription] = useState('');

  const toast = useToast();

  // Écrire une nouvelle proposition
  const { writeContract: ProposeGame, isLoading: isProposalAdding,  data: hash } = useWriteContract({
    mutation: {
      onSuccess() {
        toast({
          title: "La proposition a été envoyée.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

      },
      onError(error) {
        toast({
          title: "Erreur la proposition n'a pas été envoyée.",
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
        title: 'La description ne peux être vide.',
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

        
          toast({
              title: "Transaction envoyée avec succès.",
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
    focusBorderColor='#BFA181'
    size='sm'
      placeholder="Nom de jeu"
      value={proposalDescription}
      onChange={(e) => setProposalDescription(e.target.value)}
    />
    <Button 
     color="rgba(15, 15, 15)"
     bg="#BFA181" maxHeight="250"
     _hover={{ boxShadow: "0 0 12px 3px rgba(150, 70, 255, 0.6)" }}
     sx={{
         transition: 'box-shadow 0.33s ease-in-out',
     }}
      onClick={handleProposalSubmission}
      isLoading={isProposalAdding}
    >
      Envoyer
    </Button>
  </VStack>
 
</Box>
  );
}

export default ProposeGameTest;