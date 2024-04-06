import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, SimpleGrid, Heading, Button, Text, Image, useDisclosure } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from '@chakra-ui/react';
import GameProposal from './GameProposal';


const GameList = () => {
  return (
<SimpleGrid spacing={4} templateColumns='repeat(3, minmax(100px, 1fr))'>
<Card bg='#BFA181' maxHeight="250" _hover={{ boxShadow: "0 0 12px 3px rgba(150, 70, 255, 0.6)" }}>
    <CardHeader mb={-9}>
      <Heading size='md' textAlign="center"> Zelda</Heading>
    </CardHeader>
    <CardBody>
    <Image src="/image/Zelda.jpg" alt="Zelda" maxHeight="180px" objectFit="cover"/>
    </CardBody>
    <CardFooter>
      <Button onClick={onOpen}>Info</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Proposal Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GameProposal initialProposalId="1" />
          </ModalBody>
        </ModalContent>
      </Modal>

      <Button bg='#7855de'>Vote</Button>
    </CardFooter>
  </Card>
  <Card bg='#BFA181' maxHeight="250" _hover={{ boxShadow: "0 0 12px 3px rgba(150, 70, 255, 0.6)" }}>
  <CardHeader mb={-9}>
      <Heading size='md' textAlign="center"> Pokemon Red</Heading>
    </CardHeader>
    <CardBody>
    <Image src="/image/Pokemon.png" alt="Pokemon" maxHeight="180px" objectFit="cover" />
    </CardBody>
    <CardFooter>
      <Button>Info</Button>
      <Button>Vote</Button>
    </CardFooter>
  </Card>
  <Card bg='#BFA181' maxHeight="250" _hover={{ boxShadow: "0 0 12px 3px rgba(150, 70, 255, 0.6)" }}>
  <CardHeader mb={-9}>
      <Heading size='md' textAlign="center"> Super Mario</Heading>
    </CardHeader>
    <CardBody>
    <Image src="/image/Mario.jpg" alt="Mario" maxHeight="180px" objectFit="cover"/>
    </CardBody>
    <CardFooter>
      <Button>Info</Button>
      <Button>Vote</Button>
    </CardFooter>
  </Card>
</SimpleGrid>
  )
}


export default GameList