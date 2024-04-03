import { createPublicClient, http } from 'viem'
import { hardhat } from 'viem/chains'
import { sepolia } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: process.env.NEXT_PUBLIC_WALLET_CONNECT_CHAIN,
  transport: http()
})