import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Image, useDisclosure } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import GameProposal from './GameProposal';
import VoteGame from './VoteGame';



const GameList = () => {
    // État pour suivre l'ID de la proposition actuellement sélectionnée
    const [selectedProposalId, setSelectedProposalId] = useState(null);

    // Fonction pour ouvrir le modal avec un ID spécifique
    const openModalWithId = (id) => {
        setSelectedProposalId(id);
    };

    // Fonction pour fermer le modal
    const closeModal = () => {
        setSelectedProposalId(null);
    };

    return (
        <SimpleGrid spacing={4} templateColumns='repeat(3, minmax(100px, 1fr))'>
            {[
                { title: "Zelda", image: "/image/Zelda.jpg", id: "1" },
                { title: "Pokemon Red", image: "/image/Pokemon.png", id: "2" },
                { title: "Super Mario", image: "/image/Mario.jpg", id: "3" }
            ].map((game) => (
                <Card key={game.id} bg="rgba(15, 15, 15)" maxHeight="250"
                    _hover={{ boxShadow: "0 0 12px 3px rgba(150, 70, 255, 0.6)" }}
                    sx={{
                        transition: 'box-shadow 0.33s ease-in-out',
                    }}>
                    <CardHeader mb={-9}>
                        <Heading size='md' textAlign="center" color="#BFA181">{game.title}</Heading>
                    </CardHeader>
                    <CardBody>
                        <Image src={game.image} alt={game.title} maxHeight="180px" objectFit="cover" />
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => openModalWithId(game.id)}
                            color="rgba(15, 15, 15)"
                            bg="#BFA181" maxHeight="250"
                            _hover={{ boxShadow: "0 0 12px 3px rgba(150, 70, 255, 0.6)" }}
                            sx={{
                                transition: 'box-shadow 0.33s ease-in-out',
                            }}>Info</Button>

                    </CardFooter>
                </Card>
            ))}
            <Modal isOpen={selectedProposalId !== null} onClose={closeModal} >
                <ModalOverlay />
                <ModalContent color="#BFA181" boxShadow='base' bg="rgba(15, 15, 15)"
                    _hover={{ boxShadow: "0 0 12px 3px rgba(150, 70, 255, 0.6)" }}
                    sx={{
                        transition: 'box-shadow 0.33s ease-in-out',
                    }}>
                    <ModalHeader>Proposal Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        {selectedProposalId && <GameProposal initialProposalId={selectedProposalId} />}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </SimpleGrid>
    );
};


export default GameList