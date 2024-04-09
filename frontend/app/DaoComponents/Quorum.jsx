"use client"
import { createContext, useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { ContractAbi, ContractAddress } from "@/constants/index.js";

const Quorum = () => {
    const [totalStaked, settotalStaked] = useState(0);

    const { data } = useReadContract({
        abi: ContractAbi,
        address: ContractAddress,
        functionName: 'quorumPercentage',

    });

    useEffect(() => {
        if (data) {

            let QorumPercentage;
            if (typeof data.toNumber === 'function') {
                QorumPercentage = data.toNumber();
            } else if (typeof data === 'number') {
                QorumPercentage = data;
            } else {
                console.error('Unexpected type of data');
                return;
            }
            settotalStaked(QorumPercentage);
        }
    }, [data]);

    useEffect(() => {
    }, [totalStaked]);

    return (
        <div>
            Quorum: {totalStaked} %
        </div>
    );

};



export default Quorum;

