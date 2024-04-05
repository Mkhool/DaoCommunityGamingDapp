'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Input, Text, useToast, VStack, Tag } from '@chakra-ui/react';
import { useWriteContract, useWatchContractEvent } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';

function OwnerChoice({ address, onSuccessMakechoice }) {


  const [proposalDescription, setProposalDescription] = useState('');
  const [SessionId, setSessionId] = useState('');

  const toast = useToast();

  // Écrire une nouvelle proposition
  const { writeContract: SetChoiceAsOwner, isLoading: isProposalAdding } = useWriteContract({
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
    if (!proposalDescription.trim() || !SessionId.trim()) {
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

    SetChoiceAsOwner({
      address: ContractAddress,
      abi: ContractAbi,
      functionName: "SetChoiceAsOwner",
      account: address,
      args: [sessionIdNumber, proposalDescription]

    });

    useEffect(() => {
      const unsubscribe = useWatchContractEvent({
        address: ContractAddress, // Remplacez par l'adresse de votre contrat
        abi: ContractAbi, // Remplacez par l'ABI de votre contrat
        eventName: 'OwnerChoice', // Le nom de l'événement que vous voulez écouter
        listener: (event) => {
          console.log('Event data:', event);
          // Ici, vous pouvez traiter les données de l'événement comme nécessaire
          // Par exemple, en extrayant la direction et en la passant à une fonction ou en mettant à jour l'état
        },
      });
  
      // Cleanup en désabonnant l'événement lors du démontage du composant
      return () => unsubscribe();
    }, []);

  };



  return (
    <Box>
      <VStack spacing={4}>

        <Input color="white"
          placeholder="Session ID"
          value={SessionId}
          onChange={(e) => setSessionId(e.target.value)}
        />
        <Input color="white"
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

export default OwnerChoice;