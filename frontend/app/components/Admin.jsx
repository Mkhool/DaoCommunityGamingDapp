import React, { useEffect } from 'react'
import Events from "../components/Events";
import { DaoContractAddress, DaoContractAbi } from '@/constants';
import NavBar from './NavBar';
import { useReadContracts } from 'wagmi'
import WorkflowStepper from './WorkflowStepper';
import NextPhaseButton from './NextPhaseButton';
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
import { StarIcon, TimeIcon, AtSignIcon, BellIcon } from '@chakra-ui/icons';
import ProposeGame from './ProposeGame';
import VoteGame from './VoteGame';

const Admin = () => {

    // GetBalanceJeton({
    //     address: DaoContractAddress,
    //     abi: DaoContractAbi,
    //     functionName: "balanceOf",
    //     account: address,
    //     args: ['0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266']
    //   });
    
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
                                    <ProposeGame/>
                                    <VoteGame/>
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
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de">Leaderboard</Text>
                                    <HStack divider={<Divider orientation="vertical" />} spacing={4}>
                                        <Tag colorScheme="purple" borderRadius="full">LOL: 1500 LP</Tag>
                                        <Tag colorScheme="purple" borderRadius="full">WoW: 1280 XP</Tag>
                                        <Tag colorScheme="purple" borderRadius="full">Twitch: 999 Points</Tag>
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