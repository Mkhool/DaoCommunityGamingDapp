"use client"
import { createContext, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { StakingContractAbi, StakingContractAddress } from "@/constants/index.js";
import { ethers } from "ethers";

const DailyInterestRate = () => {
    const [totalStaked, settotalStaked] = useState(0);

    const { data } = useReadContract({
        abi: StakingContractAbi,
        address: StakingContractAddress,
        functionName: 'DailyInterestRate',

    });

    useEffect(() => {
        if (data) {

            let interestRatePercentage;
            if (typeof data.toNumber === 'function') {
                interestRatePercentage = data.toNumber();
            } else if (typeof data === 'number') {
                interestRatePercentage = data;
            } else {
                console.error('Unexpected type of data');
                return;
            }
            settotalStaked(interestRatePercentage);
        }
    }, [data]);

    useEffect(() => {
    }, [totalStaked]);

    return (
        <div>
            Daily Interest Rate: {totalStaked} %
        </div>
    );

};

export default DailyInterestRate;

