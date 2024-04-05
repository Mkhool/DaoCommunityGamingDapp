"use client"
import { createContext, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { QuestContractAbi, QuestContractAddress } from "@/constants/index.js";
import { ethers } from "ethers"; 

const Balance2 = () => {
    const { address: userAddress } = useAccount();
    const [balanceQuest, setbalanceQuest] = useState(0);

    const { data, refetch } = useReadContract({
        abi: QuestContractAbi,
        address: QuestContractAddress,
        functionName: 'balanceOf',
        args: [userAddress],
    });

    useEffect(() => {
        if (data) {
            const balanceFormatted = ethers.formatUnits(data, 18);
            const balanceRounded = parseFloat(balanceFormatted).toFixed(0); 
            setbalanceQuest(balanceRounded);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [userAddress, refetch]);

      useEffect(() => {
        console.log("Mise à jour de balanceQuest: ", balanceQuest);
    }, [balanceQuest]);

    return (
        <div>
            {balanceQuest} Quest
        </div>
    );

};



export default Balance2;

