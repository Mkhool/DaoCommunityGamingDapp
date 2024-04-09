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
                title: "number expected",
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

            setBuyTokensValue('');
            toast({
                title: "Merci mpour votre achat",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [isConfirmed])
    
    return (
       <>
            <Heading as='h2' size='xs' mt='2.8rem'>
                Acheter des tokens Quest
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
                <Input placeholder='Montant en ETH' size='xs' mt='-8' value={buyTokensValue} onChange={(e) => setBuyTokensValue(e.target.value)} />
                <Button colorScheme='purple' size='xs' mt='-8' onClick={buyTokens}>BuyTokens</Button>
            </Flex>
       </> 
    )
}

export default BuyTokens