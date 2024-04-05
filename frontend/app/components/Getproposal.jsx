import { useState, useEffect } from 'react'


import Balance from '../user/Staking'
import Events from './Events'

import { useAccount, readContract  } from 'wagmi'

import { parseAbiItem } from 'viem'

import { DaoContractAddress, DaoContractAbi } from '@/constants';

const GetProposal = () => {

    const { address } = useAccount();
    const [events, setEvents] = useState([])

    
    const result = readContract ({
        address: DaoContractAddress,
        abi: DaoContractAbi,
        functionName: 'GetProposal',
        account: address
    })

    return (
        <div>
          <NavBar/>
    <Dao/>
        </div>
      );
}

export default GetProposal