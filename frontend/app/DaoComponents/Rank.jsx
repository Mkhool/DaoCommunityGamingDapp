"use client"
import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { ContractAbi, ContractAddress } from "@/constants/index.js";


const Rank = () => {
    const { address: userAddress } = useAccount();
    const [stakingQuest, setstakingQuest] = useState("");

    const { data, refetch } = useReadContract({
        abi: ContractAbi,
        address: ContractAddress,
        functionName: 'DetermineRankByStake',
        args: [userAddress],
    });

    useEffect(() => {
        if (data) {
           
            setstakingQuest(data);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [userAddress, refetch]);

      useEffect(() => {
    }, [stakingQuest]);



    return (
        <div>
           Rang : {stakingQuest} 
        </div>
    );

};

export default Rank;

