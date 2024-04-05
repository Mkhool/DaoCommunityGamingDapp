'use client';
import { useState, useEffect } from "react";
import { Heading, Flex, Button, Input, useToast } from "@chakra-ui/react";
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from "viem";
import { QuestContractAddress, QuestContractAbi } from "@/constants";

const BuyTokens = ({ refetch, getEvents }) => {

    const { address } = useAccount();
    const toast = useToast();

    const [buyTokensValue, setBuyTokensValue] = useState('');

    const { data: hash, isPending, writeContract} = useWriteContract({
        mutation: { 
            onSuccess: () => {
                toast({
                    title: "La transaction  a été lancée",
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
        }
    }) 

    const buyTokens = async() => {
        if(!isNaN(buyTokensValue)) {
            writeContract({
                address: QuestContractAddress,
                abi: QuestContractAbi,
                functionName: 'BuyTokens',
                value: parseEther(buyTokensValue),
                account: address
            })
        }
        else {
            toast({
                title: "FAUT RENTRER UN NOMBRE :@ !!!",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

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
            setBuyTokensValue('');
            toast({
                title: "Le deposit a bien été réalisé.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [isConfirmed])
    
    return (
       <>
            <Heading as='h2' size='xl' mt='1rem'>
                BuyTokens
            </Heading>
            {isConfirmed 
            &&  <Alert mt="1rem" status='success'>
                    <AlertIcon />
                    Your transaction has been confirmed
                </Alert>}
            <Flex 
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mt="1rem"
            >
                <Input placeholder='Amount in ETH' value={buyTokensValue} onChange={(e) => setBuyTokensValue(e.target.value)} />
                <Button colorScheme='purple' onClick={buyTokens}>BuyTokens</Button>
            </Flex>
       </> 
    )
}

export default BuyTokens