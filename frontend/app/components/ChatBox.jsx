'use cliant'
import { Flex, Box, Input, Button, VStack, Text } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';

const ChatBox = () => {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const endOfMessagesRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim() !== '') {

      setMessages([...messages, message]);
      setMessage('');
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Flex direction="row" width="100%">

    </Flex>
  );
};
export default ChatBox;
