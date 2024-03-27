# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
yarn add hardhat
yarn hardhat

 yarn hardhat compile
yarn hardhat node 
yarn hardhat run .\\scripts\\deploy.js --network localhost // yarn hardhat run ./scripts/deploy.js --network localhost // pour linux
yarn hardhat verify addrescontract --network sepolia 

Voici la liste de la stack utilisée pour la réalisation du projet

Next.js
Wagmi
Chakra UI
Solidity
Natspec
Github

Excalidraw

Mémo des commandes à lancer
Run front

cd frontend

yarn install

touch /frontend/.env.local

In .env.local: "NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=MA_CLE"
Run back (blockchain)

cd backend

yarn install

yarn hardhat node --network hardhat

yarn hardhat run scripts/deploy.js --network localhost
DEPLOY ON SEPOLIA

------REQUIRE------

yarn add dotenv file .env in backend with PK = /ETHERSCAN = /INFURA = /ALCHEMY =

------DEPLOY------

yarn hardhat run ./scripts/deploy.js --network sepolia // Voting deployed to 0x40B176280A1cA4fA20D10fd7DED02d7aECb6CD91 deploy on block = 5493264

------ VERIFY CONTRACT ------

yarn hardhat verify --network sepolia 0x40B176280A1cA4fA20D10fd7DED02d7aECb6CD91 Successfully verified contract Voting on the block explorer. https://sepolia.etherscan.io/address/0x40B176280A1cA4fA20D10fd7DED02d7aECb6CD91#code

------ MAJ ADDRESS CONTRACT ------

index.js line 2 clients.js line 6 provider.jsx line 12 / 21 modify from blocknumber on voting.jsx line 114 / 122 / 130 /139

--- SEPOLIA RPC ----

create sepolia.js in network/env NEXT_PUBLIC_ALCHEMY_RPC=YOUR_ALCHEMYRPC in client.js import { sepolia } from './sepolia'

----- PACKAGE SUPP ------

npm install pino-pretty npm install encoding