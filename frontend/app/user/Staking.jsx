"use client"
import { createContext, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { StakingContractAbi, StakingContractAddress } from "@/constants/index.js";
import { ethers } from "ethers"; 

const Staking = () => {
    const { address: userAddress } = useAccount();
    const [stakingQuest, setstakingQuest] = useState(0);

    const { data, refetch } = useReadContract({
        abi: StakingContractAbi,
        address: StakingContractAddress,
        functionName: 'getStakingBalance',
        args: [userAddress],
    });

    useEffect(() => {
        if (data) {
            const balanceFormatted = ethers.formatUnits(data, 18);
            const balanceRounded = parseFloat(balanceFormatted).toFixed(0); 
            setstakingQuest(balanceRounded);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [userAddress, refetch]);

      useEffect(() => {

    }, [stakingQuest]);


    return (
        <div>
            {stakingQuest} staking
        </div>
    );

};

export default Staking;

