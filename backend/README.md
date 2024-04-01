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

###Propositions de Jeux :###
Inscription des Joueurs pour grace au staking :
Les joueurs doivent d'abord déposer des quests dans le contrat de staking pour devenir des participants actifs.

Proposition d'un Nouveau Jeu :
Les joueurs ayant déposé des quests peuvent proposer de nouveaux jeux en appelant la fonction proposeGame, en indiquant le nom du jeu proposé.

Vote pour les Jeux Proposés :
Les joueurs actifs votent pour leur jeu préféré parmi les propositions enregistrées en appelant la fonction voteForGame, en utilisant l'ID de la proposition comme argument.
Le vote est pondéré par la quantité de quests que chaque joueur a misée.

Quorum et Acceptation des Propositions :
Une proposition est acceptée si elle atteint le quorum défini, basé sur le pourcentage total de quests misés. Le système vérifie automatiquement si une proposition a atteint le quorum nécessaire pour être acceptée après chaque vote.

###Participation à un Jeu :###

Démarrage de la Session de Jeu :
L'administrateur (owner) du contrat commence une nouvelle session de jeu avec un jeu spécifique qui a été accepté, en appelant la fonction startGameSession. Ceci est possible seulement si aucun autre jeu n'est actuellement actif.

Participation des Joueurs :
Les joueurs actifs peuvent rejoindre la session de jeu en cours en appelant la fonction participateInGame, indiquant l'ID de la session à laquelle ils veulent participer.

Soumission des Choix par les Joueurs :
Pendant la session de jeu, les joueurs soumettent leur choix de jeu (par exemple, des mouvements ou des décisions dans le cadre du jeu) en appelant la fonction makeChoice.

Fin de la Session de Jeu et Distribution des Récompenses :
L'administrateur termine la session de jeu en cours en appelant la fonction endGameSession. Les récompenses, basées sur les choix corrects et la participation, sont calculées et distribuées automatiquement aux joueurs.
La session de jeu passe alors au statut terminé, et une nouvelle session peut être démarrée par l'administrateur.

Vérification des Résultats et des Récompenses :
Les joueurs et autres parties intéressées peuvent vérifier le statut et les résultats des jeux, ainsi que les récompenses distribuées, grâce aux événements émis par le contrat et les fonctions de lecture disponibles.