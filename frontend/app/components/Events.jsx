// const getStatusDescription = (status) => {
//     switch (status) {
//         case 0:
//             return 'RegisteringVoters';
//         case 1:
//             return 'ProposalsRegistrationStarted';
//         case 2:
//             return 'ProposalsRegistrationEnded';
//         case 3:
//             return 'VotingSessionStarted';
//         case 4:
//             return 'VotingSessionEnded';
//         case 5:
//             return 'VotesTallied';
//         default:
//             return 'UnknownStatus';
//     }
// };


import React, { useState, useEffect } from 'react';
import { Box, Spinner } from '@chakra-ui/react';
import { useReadContract, useAccount, serialize } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';
import { publicClient } from '@/network/client'
import { ethers } from 'ethers';
import { parseAbiItem } from 'viem'

// // VIEW ACCESS
// import VoterAccess from './VoterAccess';
// import RestrictedAccess from './RestrictedAccess';
// import AdminAccess from './AdminAccess';
// import NotConnected from './NotConnected';
// import UnregisteredUser from './UnregisteredUser'

import {
    Alert,
    AlertIcon,
    Badge,
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Button,
    Flex
} from '@chakra-ui/react';

const Events = () => {
    const { address, isConnecting } = useAccount();
    const [events, setEvents] = useState([]);
 
    // Récupère le statut actuel 
    const { data: getGameStatus, refetch: refetchGameStatus } = useReadContract({
        address: ContractAddress,
        abi: ContractAbi,
        functionName: 'GameStatus',
        watch: true,
    });


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

        const combinedEvents = [...GameSessionEnded, ...GameProposed, ...GameSessionStarted, ...GameProposalAccepted].map(event => {
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
                    eventData.address = shortenAddress(event.args.Address);
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
                    eventData._gameId = event.args._gameId;
                    eventData.description = `Gamer ${eventData.VoteForGame} voted for proposal ${eventData._gameId}`;
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
  


    return (
        <>
            <Flex justifyContent="center" alignItems="center" p="2rem">
                <Heading as='h2' size='xl' mt="1rem" color ="#BFA181">
                    Events
                </Heading>
            </Flex>
            {
                events.length > 0 ? (
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Type</Th>
                                    <Th>Description</Th>
                                    <Th>Details</Th>
                                    <Th>Hash</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {events.map((event, index) => (
                                    <Tr key={index}>
                                        <Td>
                                            <Badge colorScheme={event.type === 'ProposeGame' ? 'green' : event.type === 'VoteForGame' ? 'blue' : event.type === 'AddVoter' ? 'blue' : event.type === 'StatusChange' ? 'purple' : 'red'}>
                                                {event.type}
                                            </Badge>
                                        </Td>
                                        <Td fontSize="xs" color="#BFA181">
                                            {event.address ? `Address: ${event.address}` : ''}
                                            {event.proposalId ? ` Proposal ID: ${event.proposalId}` : ''}
                                            {event.newStatus !== undefined ? `New Status: ${getStatusDescription(event.newStatus)}` : ''}
                                        </Td>
                                        <Td fontSize="xs">{event.description}</Td>
                                        <Td><Button colorScheme='gray' size="xs">{event.hash ? `Hash: ${event.hash}` : ''}</Button></Td>

                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Alert status='info'>
                        <AlertIcon />
                        No events found.
                    </Alert>
                )
            }
        </>
    );

};

export default Events;