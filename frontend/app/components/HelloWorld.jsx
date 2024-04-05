import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,

} from '@chakra-ui/react'
import React from 'react';
function ConnectButtonUQ() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  return (
    <>
      <Button 
        size="lg"
        bgGradient="linear(to-r, #BFA181, #7855de)"
        color="white"
        position="relative"
        overflow="hidden"
        _before={{
          content: `""`,
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          bgGradient: "linear(to-r, #BFA181, #7855de)",
          zIndex: "-1",
          transition: "opacity 1s",
          opacity: "0",
        }}
        _hover={{
          boxShadow: "0 0 8px 2px rgba(0, 0, 0, 0.6)",
        }}
        onClick={onOpen}>
        Bienvenue !
      </Button>

      <AlertDialog

        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="#7855de">
            <AlertDialogHeader fontSize='lg' fontWeight='bold' >
             
              Rejoignez-nous dans cette aventure sans pareille et laissez votre légende s'écrire dans les annales de l'histoire de UnityQuest !
             
            </AlertDialogHeader>

            <AlertDialogBody>
             Vous êtes invité à embarquer pour un voyage épique à travers des mondes virtuels fascinants. Dans cette quête palpitante, l'unité et la collaboration sont de mise. Faites équipe avec des compagnons de jeu du monde entier pour surmonter les obstacles les plus redoutables et remporter des récompenses exclusives. Montrez votre persévérance, suivez votre intuition pour remporter des trésors toujours plus grands.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button color='#7855de' ref={cancelRef} onClick={onClose}>
                Fermer
              </Button>

            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default ConnectButtonUQ;