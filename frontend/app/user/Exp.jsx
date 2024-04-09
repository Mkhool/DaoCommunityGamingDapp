"use client"
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { ContractAbi, ContractAddress } from "@/constants/index.js";
import { Text} from '@chakra-ui/react'

const Exp = ({ color }) => {
    const { address: userAddress } = useAccount();
    const [stakingQuest, setstakingQuest] = useState("");

    const { data, refetch } = useReadContract({
        abi: ContractAbi,
        address: ContractAddress,
        functionName: 'DetermineLevelByExperience',
        args: [userAddress],
    });

    useEffect(() => {
        if (data) {
            console.log('Niveau d\'expérience:', data); 
            setstakingQuest(data.toString());
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [userAddress, refetch]);


    return (
        <div>
          <Text color={color} fontSize="xs">{stakingQuest}</Text>
        </div>
    );

};

export default Exp;

