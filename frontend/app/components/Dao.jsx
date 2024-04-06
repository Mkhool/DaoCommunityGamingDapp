'use client'
import React, { useEffect } from 'react'
import NavBar from './NavBar';
import { TimeIcon, AtSignIcon } from '@chakra-ui/icons';
import ProposeGameTest from '../DaoComponents/ProposeGameTest';
import Balance2 from '../DaoComponents/Balance2';
import Staking from '../user/Staking';
import TotalStaked from '../DaoComponents/TotalStaked';
import DailyInterestRate from '../DaoComponents/DailyInterestRate';
import BuyTokens from './StakeToken';
import Rank from '../user/Rank';
import GameProposal from '../DaoComponents/GameProposal';
import StakeTokens from '../user/StakeTokens';
import {
    Box,
    Grid,
    GridItem,
    VStack,
    HStack,
    Avatar,
    Text,
    Progress,
    Button,
    CircularProgress,
    CircularProgressLabel,
    Divider,
    List,
    SimpleGrid,
    ListItem,
    Tag

} from '@chakra-ui/react';
import VoteGameTest from '../DaoComponents/VoteGame';
import GameList from '../DaoComponents/GameList';

const Dao = () => {
    return (
        <>
            <Box display="flex" justifyContent="center" mt="40" width="full">
                <NavBar />
                <Box flex="1" ml="200px" maxWidth="calc(100vw - 150px - 2rem)" width="1080px">
                    <Box p={35} color="white" minH="100vh" maxWidth="1080px">
                        <Grid templateColumns="repeat(12, 1fr)" gap={6}>

                            {/* Profil et Progression*/}
                            <GridItem colSpan={3} p={4} borderRadius="md" boxShadow='xl'width="100%">
                                <VStack spacing={4} align="stretch">
                                    <BuyTokens />
                                    <StakeTokens/>
                                </VStack>
                            </GridItem>

                            {/* Tableau de Bord Principal */}
                            <GridItem colSpan={6} p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" mb={4} color="#7855de">DAO</Text>
                                    <HStack spacing={4}>

                                    </HStack>
                                    <Divider />
                                    <HStack spacing={4}>
                                        
                                    </HStack>
                                </VStack>
                            </GridItem>

                            {/* Notifications */}
                            <GridItem colSpan={3} p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="xl" color="#7855de">Notifications</Text>
                                    <List spacing={3}>
                                        <ListItem>
                                            <HStack>
                                                <Rank />
                                                <Balance2 />
                                                <Staking />
                                                <TotalStaked />
                                                <DailyInterestRate />
                                            
                                            </HStack>
                                        </ListItem>
                                        <ListItem>
                                        </ListItem>
                                    </List>
                                </VStack>
                            </GridItem>

                            {/* Game List */}
                            <GridItem colSpan={12} p={4} borderRadius="md" boxShadow='xl' >
                                <HStack spacing={3}>
                                    <GameList />
                                </HStack>
                            </GridItem>
                            {/* Annonces */}
                            <GridItem colSpan={4} p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de">Propose</Text>
                                    <Box p={4} bg="dark.300" borderRadius="md">
                                        <ProposeGameTest />

                                    </Box>
                                    <Box p={4} bg="dark.300" borderRadius="md">

                                    </Box>
                                </VStack>
                            </GridItem>

                            {/* Événements en Direct */}
                            <GridItem colSpan={4} p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de">Vote</Text>
                                    <VoteGameTest />
                                </VStack>
                            </GridItem>
                            <GridItem colSpan={4} p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de">Game</Text>
                                    <GameProposal />
                                </VStack>
                            </GridItem>
                        </Grid>
                    </Box>
                    {/* <Events /> */}
                </Box>

            </Box>

        </>

    )
}

export default Dao