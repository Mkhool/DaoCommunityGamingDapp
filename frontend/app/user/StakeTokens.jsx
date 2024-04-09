'use client';
import { useState, useEffect } from "react";
import { Heading, Flex, Button, Input, useToast } from "@chakra-ui/react";
import {
    Alert,
    AlertIcon,
} from '@chakra-ui/react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from "viem";
import { StakingContractAddress, StakingContractAbi } from "@/constants";

const StakeTokens = ({ refetch, getEvents }) => {

    const { address } = useAccount();
    const toast = useToast();

    const [StakeTokensValue, setStakeValue] = useState('');

    const { data: hash, isPending, writeContract } = useWriteContract({
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

    const StakeTokens = async () => {
        if (!isNaN(StakeTokensValue)) {
            writeContract({
                address: StakingContractAddress,
                abi: StakingContractAbi,
                functionName: 'Stake',
                value: parseEther(StakeTokensValue),
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
        if (isConfirmed) {

            setStakeValue('');
            toast({
                title: "Thank for Stakeing tokens",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    }, [isConfirmed])

    return (
        <>
            <Heading as='h2' size='xs' mt='0' >
                Staker vos tokens Quest
            </Heading>
            {isConfirmed
                && <Alert mt="1rem" status='success'>
                    <AlertIcon />
                    Your transaction has been confirmed
                </Alert>}
            <Flex
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mt="1rem"
            >
                <Input placeholder='Montant en ETH' size='xs' mt='-8' value={StakeTokensValue} onChange={(e) => setStakeValue(e.target.value)} />
                <Button colorScheme='purple' size='xs' mt='-8' onClick={StakeTokens}>Stake</Button>
            </Flex>
        </>
    )
}

export default StakeTokens