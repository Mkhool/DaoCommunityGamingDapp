
import { Box } from '@chakra-ui/react';
import NavBar from './NavBar';


const TwitchStream = ({ channelName  }) => {
  const src = `https://player.twitch.tv/?channel=${channelName }&parent=localhost`;
  
  return (
    
    <Box className="twitch-container" width="60vw" h="500px" ml="120" mt="10">
      <iframe
        src={src}
        height="100%"
        width="100%"
        allowFullScreen={true}
        
      ></iframe>
    </Box>
  );
};

export default TwitchStream;