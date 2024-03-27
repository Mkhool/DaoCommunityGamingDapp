'use client';

import { Flex } from '@chakra-ui/react'
import "../globals.css";
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <Flex
      direction="column"
      minH="100vh"
      justifyContent="center"
    >
      <Header />
      <Flex
        grow="1"
        p="2rem"
      >
        {children}
      </Flex>
      <Footer />
    </Flex>
  )
}

export default Layout