'use client'

import Dashboard from "../components/Dashboard";
import { Box } from '@chakra-ui/react';

const Page = () => {
  return (
    <Box
    sx={{
      position: 'relative',
      _before: {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: "url('/image/UQ3.jpg')",
        backgroundSize: 'cover',
        opacity: '0.04', 
        zIndex: -1,
      } 
    }}
    p={35}
    color="white"
    minH="100vh"
  >
    <div>
 <Dashboard/>
    </div>
    </Box>
  );
};

export default Page;