'use Client'
import React from 'react';

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
    Tag,
    Image 

} from '@chakra-ui/react';
import { StarIcon, TimeIcon, AtSignIcon, BellIcon } from '@chakra-ui/icons';
import NavBar from './NavBar';
import Rank from '../user/Rank';
import DisplayLevel from '../user/DisplayLevel';
function Dashboard() {

    return (
            <Box display="flex" mt="10">
                 <NavBar />
                 <Box flex="1" ml="150px" maxWidth="calc(100vw - 150px - 2rem)">
      <Box p={35} color="white" minH="100vh">
        <Grid templateColumns="repeat(12, 1fr)" gap={6}>

                            {/* Profil et Progression*/}
                            <GridItem colSpan={3} p={4} borderRadius="md" boxShadow='xl' >
                                <VStack spacing={4} align="stretch">
                                  <Rank />
                                  <Image src="/image/Diamond.png" alt="Banner" mx="auto" maxWidth="160px" maxHeight="16vh" />
                                {/* <DisplayLevel/> */}
                                </VStack>
                            </GridItem> 

                            {/* Tableau de Bord Principal */}
                            <GridItem colSpan={6} p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" mb={4} color="#7855de">DashBoard</Text>
                                    <HStack spacing={4}>
                                        <CircularProgress value={40} color="purple.500" thickness="12px">
                                            <CircularProgressLabel>40%</CircularProgressLabel>
                                        </CircularProgress>
                                        <Box>
                                            <Text color="white">Expérience Globale</Text>
                                            <Progress value={40} size="sm" colorScheme="purple" />
                                        </Box>
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
                                    <Text fontSize="xl" color="#7855de" as ='b'>Notifications</Text>
                                    <List spacing={3}>
                                        <ListItem>
                                            <HStack>
                                                <BellIcon color="purple.500" />
                                                <Text color="#BFA181">Nouvelle quête disponible!</Text>
                                            </HStack>
                                        </ListItem>
                                        <ListItem>
                                            <HStack>
                                                <BellIcon color="purple.500" />
                                                <Text color="#BFA181">Événement communautaire bientôt!</Text>
                                            </HStack>
                                        </ListItem>
                                    </List>
                                </VStack>
                            </GridItem>

                            {/* Leaderboard */}
                            <GridItem colSpan={12} p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de" as ='b' >Leaderboard</Text>
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
                                    <Text fontSize="2xl" color="#7855de" as ='b' >Annonces</Text>
                                    <Box p={4} bg="dark.300" borderRadius="md">
                                        <Text fontWeight="bold" color="#BFA181">Maintenance planifiée</Text>
                                        <Text color="#BFA181">Nous aurons une maintenance ce vendredi à 22h00 GMT. Attendez-vous à une courte interruption de service.</Text>
                                    </Box>
                                    <Box p={4} bg="dark.300" borderRadius="md">
                                        <Text fontWeight="bold" color="#BFA181">Nouvelle fonctionnalité</Text>
                                        <Text color="#BFA181">Découvrez notre toute nouvelle salle de quête pour des défis épiques!</Text>
                                    </Box>
                                </VStack>
                            </GridItem>

                            {/* Événements en Direct */}
                            <GridItem colSpan={4}  p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de" as ='b'>Événements en Direct</Text>
                                    <List spacing={3}>
                                        <ListItem>
                                            <HStack>
                                                <StarIcon color="purple.500" />
                                                <Text color="#BFA181">Stream spécial avec Vitalik - 20h00 GMT</Text>
                                            </HStack>
                                        </ListItem>
                                        <ListItem>
                                            <HStack>
                                                <StarIcon color="purple.500" />
                                                <Text color="#BFA181">Tournoi intercommunautaire de LoL - 18h00 GMT demain</Text>
                                            </HStack>
                                        </ListItem>
                                    </List>
                                </VStack>
                            </GridItem>
                            <GridItem colSpan={4} p={4} borderRadius="md" boxShadow='xl'>
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="#7855de" as ='b'>Ouverture saison 2</Text>
                                    <List spacing={3}>
                                        <ListItem>
                                            <HStack>
                                                <StarIcon color="purple.500" />
                                                <Text color="#BFA181">Nouvelle collection de nft disponibles</Text>
                                            </HStack>
                                        </ListItem>
                                        <ListItem>
                                            <HStack>
                                                <StarIcon color="purple.500" />
                                                <Text color="#BFA181">Nouveaux objets à utiliser en jeu </Text>
                                            </HStack>
                                        </ListItem>
                                    </List>
                                </VStack>
                            </GridItem>
                         </Grid>
                    </Box> 

                </Box>
               
            </Box>


    );
}

export default Dashboard;
