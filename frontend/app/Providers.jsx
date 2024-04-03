'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';

import { WagmiProvider } from 'wagmi';
import {hardhat} from 'wagmi/chains';


import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

import './globals.css';

const config = getDefaultConfig({
  appName: 'UnityQuest',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  chains: [hardhat], // change to hardhat if needed
  ssr: true, 
});

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'var(--font-mono)',
        color: 'rgb(var(--foreground-rgb))',
        background: 'linear-gradient(180deg, rgba(var(--background-start-rgb),1) 0%, rgba(var(--background-end-rgb),1) 100%)',
      },
    },
  },
});

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#7b3fe4',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })}
        
        >
          <ChakraProvider theme={theme}>
            {children}
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Providers