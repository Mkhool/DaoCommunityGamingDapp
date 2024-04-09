'use client'
import React, { useEffect } from 'react'
import Events from "../components/Events";
import BuyTokens from '../user/BuyTokens';
import NavBar from '../components/NavBar';

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
    ListItem,
    Tag 

} from '@chakra-ui/react';
import { TimeIcon, AtSignIcon  } from '@chakra-ui/icons';
import ProposeGame from '../user/ProposeGame';
import VoteGame from '../components/VoteGameOld';
import StartGameSession from './StartGameSession';
import EndGameSession from './EndGameSession';
import MakeChoice from '../components/MakeChoice';
import ProposeGameTest from '../DaoComponents/ProposeGameTest';
import OwnerChoice from './OwnerChoice';
import VoteGameTest from '../DaoComponents/VoteGame';

const Admin = () => {


  return (
    <>
                <Box display="flex">
                 <NavBar />
                 <Box flex="1" ml="150px" maxWidth="calc(100vw - 150px - 2rem)" mt='20'>
      <Box p={35} color="white" minH="100vh">
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>

                            {/* Profil et Progression*/}
                            <GridItem colSpan={3} p={4} borderRadius="md" boxShadow='xl' >
                                <VStack spacing={4} align="stretch">
                              </VStack>
                            </GridItem> 

                            {/* Tableau de Bord Principal */}
                            <GridItem colSpan={6} p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" mb={4} color="#7855de">DashBoard</Text>
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
                                           

                                            </HStack>
                                        </ListItem>
                                        <ListItem>
                                            <HStack>
                                                

                                            </HStack>
                                        </ListItem>
                                    </List>
                                </VStack>
                            </GridItem>

                            {/* Leaderboard */}
                            <GridItem colSpan={12} p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={3}>
                                    <Text fontSize="2xl" color="#7855de">Administration</Text>
                                    <HStack divider={<Divider orientation="vertical" />} spacing={4}>

                                    <StartGameSession/>
                                     <EndGameSession/>
                                    </HStack>
                                </VStack>
                            </GridItem>
                            {/* Annonces */}
                            <GridItem colSpan={4}  p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de"></Text>
                                    <Box p={4} bg="dark.300" borderRadius="md">
                                      
                                    </Box>
                                    <Box p={4} bg="dark.300" borderRadius="md">
                                       
                                    </Box>
                                </VStack>
                            </GridItem>

                            {/* Événements en Direct */}
                            <GridItem colSpan={4}  p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de"></Text>
             
                                </VStack>
                            </GridItem>
                            <GridItem colSpan={4} p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de"></Text>
                                    
                                </VStack>
                            </GridItem>
                         </Grid>
                    </Box> 
                </Box>
                
            </Box>

    </>
 
  )
}

export default Admin