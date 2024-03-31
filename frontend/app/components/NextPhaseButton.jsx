'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { Button, Spinner, useToast, btnText, Box, Input } from '@chakra-ui/react'
import { useWriteContract, useReadContract } from 'wagmi'

import { currentPhaseNextPhase, DaoContractAbi, DaoContractAddress, gameStatuses } from '@/constants'

const NextPhaseButton = ({GameStatus, onSuccessfulNextPhase}) => {
    const [sessionId, setSessionId] = useState('') 
  const toast = useToast();

  const { data: getGameStatus, refetch: refetchGameStatus } = useReadContract({
    address: DaoContractAddress,
    abi: DaoContractAbi,
    functionName: 'GameStatus',
    watch: true,
});


  const { isPending: nextPhaseIsPending, writeContract: setNextPhase } = useWriteContract({
    mutation: {
        onSuccess: () => {
            onSuccessfulNextPhase();
            toast({
                title: currentPhaseNextPhase[GameStatus].message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: (error) => {
            toast({
                title: error.shortMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        },
    },
  })

  const handleSetNextPhase = async() => {
    setNextPhase({
          address: DaoContractAddress,
          abi: DaoContractAbi,
          functionName: currentPhaseNextPhase[GameStatus].function,
          args: [sessionId]
      })
  }

  return (
    <Box>
    <Input
        placeholder='Entrer id de la session'
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
        mb={4}
      />
    <Button
      colorScheme='purple'
      size='lg'
      onClick={handleSetNextPhase}
      isDisabled={GameStatus === 5}
    >
      {nextPhaseIsPending ? <Spinner /> : (currentPhaseNextPhase[GameStatus]?.btnText || "Invalid Game Status")}
    </Button>
    </Box>
  )
}

export default NextPhaseButton