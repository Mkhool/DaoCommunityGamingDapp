'use client'
import React, { useEffect } from 'react'
import Events from "../components/Events";

import NavBar from './NavBar';

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
import ProposeGame from './ProposeGame';
import VoteGame from './VoteGame';
import StartGameSession from './StartGameSession';
import EndGameSession from './EndGameSession';
import MakeChoice from './MakeChoice';

import OwnerChoice from './OwnerChoice';


const Admin = () => {


    
useEffect(() =>{

}, [Events])

  return (
    <>
                <Box display="flex">
                 <NavBar />
                 <Box flex="1" ml="150px" maxWidth="calc(100vw - 150px - 2rem)">
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
                                        <Button leftIcon={<TimeIcon />} colorScheme="purple">Quêtes journalières</Button>
                                        <Button leftIcon={<AtSignIcon />} colorScheme="purple">Missions spéciales</Button>
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
                                    <ProposeGame/>
                                    <VoteGame/>
                                    <StartGameSession/>
                                    <MakeChoice/>
                                    <EndGameSession/>
                                    </HStack>
                                </VStack>
                            </GridItem>
                            {/* Annonces */}
                            <GridItem colSpan={4}  p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de">Annonces</Text>
                                    <Box p={4} bg="dark.300" borderRadius="md">
                                      
                                    </Box>
                                    <Box p={4} bg="dark.300" borderRadius="md">
                                       
                                    </Box>
                                </VStack>
                            </GridItem>

                            {/* Événements en Direct */}
                            <GridItem colSpan={4}  p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de">Événements en Direct</Text>
             <OwnerChoice/>
                                </VStack>
                            </GridItem>
                            <GridItem colSpan={4} p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de">Événements en Direct</Text>
                                    
                                </VStack>
                            </GridItem>
                         </Grid>
                    </Box> 
                    <Events/>
                </Box>
                
            </Box>
            {/* <NextPhaseButton/> */}
            {/* <WorkflowStepper /> */}
            
    </>
 
  )
}

export default Admin