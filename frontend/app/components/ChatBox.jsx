'use cliant'
import { Flex, Box, Input, Button, VStack, Text } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';

const ChatBox = () => {
    // Initialisation de l'état messages avec useState
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const endOfMessagesRef = useRef(null);

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            // Ajout du nouveau message à l'état messages
            setMessages([...messages, message]);
            setMessage(''); // Réinitialise le champ de message après l'envoi
        }
    };

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

    return (
<Flex direction="row" width="100%">
{/* 
      <Flex direction="column" ml={850} mt="-500" width="300px" bg="rgba(0, 0, 0, 0.6)" p={4} h="500px" borderRadius='lg'>
        <VStack spacing={2} width="100%" flexGrow={1} overflowY="auto">
          {messages.map((msg, index) => (
            <Text key={index} bg="purple.900" p={1} borderRadius="md" width="100%" fontSize="xs" color="white">
              {msg}
            </Text>
          ))}
          
          <div ref={endOfMessagesRef} />
        </VStack>
        <Flex mt={4}>
          <Input
          focusBorderColor='purple.800'
            placeholder="message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            mr={2}
          />
          <Button 
          colorScheme='purple' 
          variant='outline' 
          _hover={{ bg: 'purple.500', color: 'black' }}
          onClick={handleSendMessage}>
            Envoyer
          </Button>
        </Flex>
      </Flex> */}
    </Flex>
  );
};
export default ChatBox;
