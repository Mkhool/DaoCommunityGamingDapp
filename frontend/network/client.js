import { createPublicClient, http } from 'viem'
import { hardhat } from 'viem/chains'
import { sepolia } from 'viem/chains'

export const publicClient = createPublicClient({
  chain: hardhat,
  transport: http()
})