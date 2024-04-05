'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Input, Text, useToast, VStack , Tag } from '@chakra-ui/react';
import { useWriteContract, useWatchContractEvent, useWaitForTransactionReceipt } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';

function MakeChoice({ address, onSuccessMakechoice }) {

 useWatchContractEvent({
    address: ContractAddress, 
    abi: ContractAbi, 
    eventName: 'ChoiceMade',
    onLogs(logs) {
      console.log('New logs!', logs)
    },
  });


  const [proposalDescription, setProposalDescription] = useState('');
  const [SessionId, setSessionId] = useState('');

  const toast = useToast();

  // Écrire une nouvelle proposition
  const { writeContract: MakeChoice, isLoading: isProposalAdding, data: hash  } = useWriteContract({
    mutation: {
      onSuccess() {
        toast({
          title: "Direction has been sent.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

       
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

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
  useWaitForTransactionReceipt({ 
    hash, 
  }) 

  useEffect(() => {
      if(isConfirmed) {
        
          toast({
              title: "Choice submitted",
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
      placeholder="Session ID"
      value={SessionId}
      onChange={(e) => setSessionId(e.target.value)}
    />
        <Input
      placeholder="Direction"
      value={proposalDescription}
      onChange={(e) => setProposalDescription(e.target.value)}
    />
    <Button colorScheme='whiteAlpha'
      onClick={handleProposalSubmission}
      isLoading={isProposalAdding}
    >
      Submit Choice
    </Button>
  </VStack>
 
</Box>
  );
}

export default MakeChoice;