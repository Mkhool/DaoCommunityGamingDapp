import React, { useState, useEffect } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { ContractAddress, ContractAbi } from '@/constants';
import { publicClient } from '@/network/client'

import { parseAbiItem } from 'viem'

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

const Events = ({ }) => {
    const { address, isConnecting } = useAccount();
    const [events, setEvents] = useState([]);

    // Récupère le statut actuel 
    const { data: getGameStatus, refetch: refetchGameStatus } = useReadContract({
        address: ContractAddress,
        abi: ContractAbi,
        functionName: 'GameStatus',
        watch: true,
    });


    return (
        <>
            <Flex justifyContent="center" alignItems="center" p="2rem">
                <Heading as='h2' size='xl' mt="1rem" color="#BFA181">
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
                                            <Badge colorScheme={event.type === 'SetChoiceAsOwner' ? 'green' : event.type === 'ProposeGame' ? 'green' : event.type === 'VoteForGame' ? 'blue' : event.type === 'MakeChoise' ? 'blue' : event.type === 'GameStatus' ? 'purple' : 'red'}>
                                                {event.type}
                                            </Badge>
                                        </Td>
                                        <Td fontSize="xs" color="#BFA181">
                                            {/* {event.address ? `Address: ${event.address}` : ''} */}
                                            {event.proposalId ? ` Proposal ID: ${event.proposalId}` : ''}
                                            {event.gameId ? ` Game ID: ${event.gameId}` : ''}
                                            {event.sessionId ? ` Session ID: ${event.sessionId}` : ''}
                                            {event.direction ? ` Direction: ${event.direction}` : ''}
                                             {event.description ? ` Description: ${event.description}` : ''}
                                            {event.voter ? ` Voter: ${event.voter}` : ''}
                                            {event.choice ? ` Choice: ${event.choice}` : ''}
                                            {event.owner ? ` Owner: ${event.owner}` : ''}
                                           

                                        </Td>
                                        <Td fontSize="xs"  color="#BFA181">{event.description}</Td>
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