'use Client'
import React from 'react';

import {
    Box,
    ChakraProvider,
    Progress,
    Text,
    VStack,
    HStack,
    Button,
    List,
    ListItem,
    ListIcon,
    Grid,
    GridItem,
    Badge,
    extendTheme,
    useColorModeValue,
    CircularProgress,
    CircularProgressLabel,
    Avatar,
    Divider,
    Tag,
} from '@chakra-ui/react';
import { StarIcon, TimeIcon, AtSignIcon, BellIcon } from '@chakra-ui/icons';
import NavBar from './NavBar';



function Dashboard() {


    return (
            <Box display="flex">
                <Box flex="1">


                    {/* <Box p={35} bg="rgba(0, 0, 0, 0.5)" color="white" minH="100vh">
                        <Grid templateColumns="repeat(12, 1fr)" gap={6}> */}

                            {/* Profil et Progression
                            <GridItem colSpan={3} bg="gray" p={4} borderRadius="md" boxShadow='base' >
                                <VStack spacing={4} align="stretch">
                                    <Avatar size="2xl" name="Medhi" src="/img/pp.jpg" />
                                    <Text fontSize="xl" color="purple">Medhi</Text>
                                    <Progress value={65} size="sm" colorScheme="purple" />
                                    <Text color="white">65% vers le prochain niveau</Text>
                                    <Text color="white">Bonus Actuel: 5% Points</Text>
                                    <Button colorScheme="purple">Modifier le profil</Button>
                                </VStack>
                            </GridItem> */}

                            {/* Tableau de Bord Principal */}
                            {/* <GridItem colSpan={6} bg="black" p={4} borderRadius="md">
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" mb={4} color="purple">Tableau de bord</Text>
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
                            </GridItem> */}

                            {/* Notifications */}
                            {/* <GridItem colSpan={3} bg="black" p={4} borderRadius="md">
                                <VStack spacing={4}>
                                    <Text fontSize="xl" color="purple">Notifications</Text>
                                    <List spacing={3}>
                                        <ListItem>
                                            <HStack>
                                                <BellIcon color="purple.500" />
                                                <Text color="white">Nouvelle quête disponible!</Text>
                                            </HStack>
                                        </ListItem>
                                        <ListItem>
                                            <HStack>
                                                <BellIcon color="purple.500" />
                                                <Text color="white">Événement communautaire bientôt!</Text>
                                            </HStack>
                                        </ListItem>
                                    </List>
                                </VStack>
                            </GridItem> */}

                            {/* Leaderboard */}
                            {/* <GridItem colSpan={12} bg="black" p={4} borderRadius="md">
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="purple">Leaderboard</Text>
                                    <HStack divider={<Divider orientation="vertical" />} spacing={4}>
                                        <Tag colorScheme="purple" borderRadius="full">LOL: 1500 LP</Tag>
                                        <Tag colorScheme="purple" borderRadius="full">WoW: 1280 XP</Tag>
                                        <Tag colorScheme="purple" borderRadius="full">Twitch: 999 Points</Tag>
                                    </HStack>
                                </VStack>
                            </GridItem> */}
                            {/* Annonces */}
                            {/* <GridItem colSpan={6} bg="black" p={4} borderRadius="md">
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="purple">Annonces</Text>
                                    <Box p={4} bg="dark.300" borderRadius="md">
                                        <Text fontWeight="bold" color="white">Maintenance planifiée</Text>
                                        <Text color="white">Nous aurons une maintenance ce vendredi à 22h00 GMT. Attendez-vous à une courte interruption de service.</Text>
                                    </Box>
                                    <Box p={4} bg="dark.300" borderRadius="md">
                                        <Text fontWeight="bold" color="white">Nouvelle fonctionnalité</Text>
                                        <Text color="white">Découvrez notre toute nouvelle salle de quête pour des défis épiques!</Text>
                                    </Box>
                                </VStack>
                            </GridItem> */}

                            {/* Événements en Direct */}
                            {/* <GridItem colSpan={6} bg="black" p={4} borderRadius="md">
                                <VStack spacing={4}>
                                    <Text fontSize="2xl" color="purple">Événements en Direct</Text>
                                    <List spacing={3}>
                                        <ListItem>
                                            <HStack>
                                                <StarIcon color="purple.500" />
                                                <Text color="white">Stream spécial avec Invocateur1 - 20h00 GMT</Text>
                                            </HStack>
                                        </ListItem>
                                        <ListItem>
                                            <HStack>
                                                <StarIcon color="purple.500" />
                                                <Text color="white">Tournoi intercommunautaire de LoL - 18h00 GMT demain</Text>
                                            </HStack>
                                        </ListItem>
                                    </List>
                                </VStack>
                            </GridItem> */}
                        {/* </Grid>
                    </Box> */}

                </Box>
                <NavBar />
            </Box>


    );
}

export default Dashboard;
