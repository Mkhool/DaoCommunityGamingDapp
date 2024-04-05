
import Dashboard from './Dashboard';
import NavBar from './NavBar';
import NotConnected from '../DesignPage/NotConnected';
import { QuestContractAddress, QuestContractAbi } from "@/constants";
import { useAccount, useReadContract } from 'wagmi'
import { publicClient } from '@/utils/client'
import { parseAbiItem } from 'viem'
import { useState, useEffect } from 'react'
import BuyTokens from '../user/BuyTokens';
import Balance from '../user/Staking'
import Events from './Events'
import { ContractAddress, ContractAbi } from '@/constants';

const Main = ({ isUserConnected }) => {
  const { address } = useAccount();
  const [events, setEvents] = useState([])

  const { data: balanceOfConnectedAddress, error, isPending, refetch } = useReadContract({
    address: QuestContractAddress,
    abi: QuestContractAbi,
    functionName: 'getBalance',
    account: address
  })
  const getEvents = async () => {
    const GameSessionStarted = await publicClient.getLogs({
        address: ContractAddress,
        event: parseAbiItem('event GameSessionStarted(uint256 indexed sessionId, uint256 gameId)'),
        fromBlock: BigInt(process.env.NEXT_PUBLIC_EVENT_BLOCK_NUMBER),
        toBlock: 'latest'
    })

    const GameSessionEnded = await publicClient.getLogs({
        address: ContractAddress,
        event: parseAbiItem('event GameSessionEnded(uint256 indexed sessionId)'),
        fromBlock: BigInt(process.env.NEXT_PUBLIC_EVENT_BLOCK_NUMBER),
        toBlock: 'latest'
    })

    const GameProposed = await publicClient.getLogs({
        address: ContractAddress,
        event: parseAbiItem('event GameProposed(uint256 nextGameId, string gameName)'),
        fromBlock: BigInt(process.env.NEXT_PUBLIC_EVENT_BLOCK_NUMBER),
        toBlock: 'latest'

    })

    const GameProposalAccepted = await publicClient.getLogs({
        address: ContractAddress,
        event: parseAbiItem('event GameProposalAccepted(uint256 indexed gameId)'),
        fromBlock: BigInt(process.env.NEXT_PUBLIC_EVENT_BLOCK_NUMBER),
        toBlock: 'latest'
    })

    const ChoiceMade = await publicClient.getLogs({
        address: ContractAddress,
        event: parseAbiItem('event ChoiceMade(uint256 _sessionId, string _direction)'),
        fromBlock: BigInt(process.env.NEXT_PUBLIC_EVENT_BLOCK_NUMBER),
        toBlock: 'latest'
    })

    const OwnerChoice = await publicClient.getLogs({
        address: ContractAddress,
        event: parseAbiItem('event OwnerChoice(uint256 _sessionId, string _direction)'),
        fromBlock: BigInt(process.env.NEXT_PUBLIC_EVENT_BLOCK_NUMBER),
        toBlock: 'latest'
    })

    console.log(OwnerChoice);
    const combinedEvents = [...GameSessionEnded, ...GameProposed, ...GameSessionStarted, ...GameProposalAccepted, ...ChoiceMade, ...OwnerChoice].map(event => {
        let eventData = {
            type: 'Unknown',
            blockNumber: Number(event.blockNumber),
        };

        function shortenAddress(address) {
            return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
        }

        function shortenHash(hash) {
            return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
        }

        switch (event.eventName) {
            case 'GameSessionStarted':
                eventData.type = 'GameStatus';
                eventData.description = "GameSessionStarted";
                // eventData.address = shortenAddress(event.args.Address);
                eventData.hash = shortenHash(event.transactionHash);
                break;

            case 'GameSessionEnded':
                eventData.type = 'GameStatus';
                eventData.description = "GameSessionEnded";
                eventData.hash = shortenHash(event.transactionHash);
                break;

            case 'GameProposed':
                const proposal = event.args.proposalId
                eventData.type = 'ProposeGame';
                eventData.nextGameId = "1"
                eventData.description = `Proposal ID: ${proposal}, Game Name: ${event.args.gameName} registered.`;
                eventData.hash = shortenHash(event.transactionHash);
                break;

            case 'GameProposalAccepted':
                eventData.type = 'VoteForGame';
                eventData.address = event.args.address;
                eventData.gameId = event.args.gameId;
                eventData.description = `Gamer ${eventData.VoteForGame} voted for proposal ${eventData._gameId}`;
                eventData.hash = shortenHash(event.transactionHash);
                break;

            // case 'ChoiceMade':
            //     eventData.type = 'MakeChoice';
            //     eventData.address = event.args.address;
            //     eventData._gameId = event.args._gameId;
            //     eventData.description = `Gamers ${eventData.MakeChoice} voted for direction ${eventData._direction}`;
            //     eventData.hash = shortenHash(event.transactionHash);
            //     break;

            case 'OwnerChoice':
                eventData.type = 'SetChoiceAsOwner';
                // eventData.address = event.args.address;
                // eventData._gameId = event.args._gameId;
                eventData.description = `Owner set direction to ${event.args._direction}`;
                eventData.hash = shortenHash(event.transactionHash);
                break;
        }
        return eventData;
    });

    combinedEvents.sort(function (a, b) {
        return b.blockNumber - a.blockNumber;
    });

    setEvents(combinedEvents)
}

useEffect(() => {
    const getAllEvents = async () => {
        if (address !== undefined) {
            await getEvents();
        }
    }
    getAllEvents();
}, [address])
  
    if (!isUserConnected) {
        return <NotConnected />;
      } else {
        return (
          <>
            <NavBar />
            <Dashboard />
            <BuyTokens refetch={refetch} getEvents={getEvents} />
   
      <Events events={events} />
          </>
        );
      }
    };
export default Main