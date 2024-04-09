'use client'
import React, { useEffect } from 'react'

import NavBar from './components/NavBar';


import { useAccount } from "wagmi";
import NotConnected from './DesignPage/NotConnected';

import {
    Box,
    Grid,
    GridItem,
    VStack,
    HStack,
    Text,
    Divider,
    Image
} from '@chakra-ui/react';

const Page = () => {

    const { address } = useAccount();
    const { isConnected } = useAccount();

    return (

        <>
            {isConnected ? (
                <Box display="flex">
                    <NavBar />
                    <Box flex="1" ml="150px" maxWidth="calc(100vw - 150px - 2rem)" mt='20'>
                        <Box p={35} color="white" minH="100vh">
                            <Grid templateColumns="repeat(12, 1fr)" gap={6}>

                                {/* Annonces */}
                                <GridItem colSpan={12} p={4} borderRadius="md" boxShadow='xl'>
                                    <VStack spacing={3}>
                                        <Text fontSize="2xl" color="#7855de" as='b'>Bienvenue ! </Text>
                                        <HStack divider={<Divider orientation="vertical" />} spacing={4}>
                                            <Text fontSize="lg" color="#BFA181" as='b'>Vous êtes invité à embarquer pour un voyage épique à travers des mondes virtuels fascinants. Dans cette quête palpitante, l'unité et la collaboration sont de mise. Faites équipe avec des compagnons de jeu du monde entier pour surmonter les obstacles les plus redoutables et remporter des récompenses exclusives. Montrez votre persévérance, suivez votre intuition pour remporter des trésors toujours plus grands.</Text>
                                        </HStack>
                                    </VStack>
                                </GridItem>
                                <GridItem colSpan={4} p={4} borderRadius="md" boxShadow='xl'>
                                    <VStack spacing={4}>
                                        <Text fontSize="2xl" color="#7855de" as='b'>DAO</Text>
                                        <Box p={4} bg="dark.300" borderRadius="md">
                                        <Image src="/image/BlueToken.png" alt="Banner" mx="auto" maxWidth="160px" maxHeight="16vh" />
                                        <Text color="#BFA181" mt='4'>                           
                                        <Text as='b'>Stake pour Participer </Text>  activement à la prise de décision concernant le choix des jeux, les jeux en partenariat, et d'autres aspects du projet.
                                       <br></br>
                                       <Text as='b'> Stake pour proposer  </Text> des évolutions sur le projet/mécanique ainsi que des jeux à ajouter.                              
</Text>
                                        </Box>
                                        <Box p={4} bg="dark.300" borderRadius="md">

                                        </Box>
                                    </VStack>
                                </GridItem>

                                {/* Événements en Direct */}
                                <GridItem colSpan={4} p={4} borderRadius="md" boxShadow='xl'>
                                    <VStack spacing={4}>
                                        <Text fontSize="2xl" color="#7855de" as='b'></Text>
                                        <Image src="/image/UQTDouble.png" alt="Banner" mx="auto" maxWidth="200px" maxHeight="50vh" />
                                    </VStack>
                                </GridItem>
                                <GridItem colSpan={4} p={4} borderRadius="md" boxShadow='xl'>
                                    <VStack spacing={4}>
                                        <Text fontSize="2xl" color="#7855de" as='b'> Play to Earn</Text>
                                        <Image src="/image/RedToken.png" alt="Banner" mx="auto" maxWidth="160px" maxHeight="16vh" />
                                        <Text color="#BFA181">
                                       
                                        <Text as='b'>Plusieurs mode de jeux: </Text> Anarchique, démocratique, speedrun et battle !
                                     
                                       <Text as='b'> Récompenses:  </Text> Les joueurs sont récompensés pour leur persévérance, intuition et rapidité.
                                            </Text>
                                    </VStack>
                                </GridItem>
                            </Grid>
                        </Box>
                    </Box>

                </Box>
            ) : (
                <NotConnected />
            )}
        </>
    )
}

export default Page