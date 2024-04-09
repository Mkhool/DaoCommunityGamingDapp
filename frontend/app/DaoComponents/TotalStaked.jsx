"use client"
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { StakingContractAbi, StakingContractAddress } from "@/constants/index.js";
import { ethers } from "ethers";

const TotalStaked = () => {
    const [totalStaked, settotalStaked] = useState(0);

    const { data } = useReadContract({
        abi: StakingContractAbi,
        address: StakingContractAddress,
        functionName: 'totalStaked',

    });

    useEffect(() => {
        if (data) {
            const balanceFormatted = ethers.formatUnits(data, 18);
            const balanceRounded = parseFloat(balanceFormatted).toFixed(0);
            settotalStaked(balanceFormatted);

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

