import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { ContractAbi, ContractAddress } from '@/constants/index';
import { Text } from '@chakra-ui/react';

const DisplayLevel = () => {
  const { address } = useAccount();
  const [level, setLevel] = useState('Chargement...');

  const { data, isError, isLoading } = useReadContract({
    address: ContractAddress,
    abi: ContractAbi,
    functionName: 'DetermineLevelByExperience',
    args: address ? [address] : [],
    watch: true, 
  });

  useEffect(() => {
    console.log("Data:", data);
    console.log("Loading:", isLoading);
    console.log("Error:", isError);
    
    if (data && !isLoading && !isError) {
      setLevel(data.toString());
    }
  }, [data, isLoading, isError]);

  useEffect(() => {
    console.log("Adresse:", address);
    console.log("Niveau:", data);
  }, [address, data]);

  return (
    <div>
      <Text fontSize="xs">Niveau: {level}</Text>
    </div>
  );
};

export default DisplayLevel;
