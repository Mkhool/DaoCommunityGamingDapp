"use client"
import { createContext, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { StakingContractAbi, StakingContractAddress } from "@/constants/index.js";
import { ethers } from "ethers"; 

const TotalStaked = () => {
    const [totalStaked, settotalStaked] = useState(0);

    const { data } = useReadContract({
        abi: StakingContractAbi,
        address: StakingContractAddress,
        functionName: 'totalStaked',
        
    });

//     const tvl = async () => {
//         let tvlskd = await contract.isActive().toString();
// console.log(isActive)
//     }

    useEffect(() => {
        if (data) {
            const balanceFormatted = ethers.formatUnits(data, 18);
            const balanceRounded = parseFloat(balanceFormatted).toFixed(0); 
            setbalanceQuest(balanceRounded);
        }
    }, [data]);

      useEffect(() => {
    }, [totalStaked]);

    return (
        <div>
            {totalStaked} TotalStaked
        </div>
    );

};



export default TotalStaked;

