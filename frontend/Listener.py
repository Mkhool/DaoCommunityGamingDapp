from web3 import Web3
import json
import asyncio
import websockets

contract_address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" 
# URL RPC HTTP locale de Hardhat (par défaut sur le port 8545)
http_rpc_url = "http://localhost:8545"
web3 = Web3(Web3.HTTPProvider(http_rpc_url))

contract_abi =  json.loads("""
[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_stakingContractAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "gamer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "currentCycle",
        "type": "uint256"
      }
    ],
    "name": "AlreadyParticipatedInCurrentCycle",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EmptyProposal",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      }
    ],
    "name": "GameDoesNotExist",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GameProposalDoesNotExist",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "stakedAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "requiredMinimumStake",
        "type": "uint256"
      }
    ],
    "name": "InsufficientStake",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "direction",
        "type": "string"
      }
    ],
    "name": "InvalidChoice",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "nextGameId",
        "type": "uint256"
      }
    ],
    "name": "ProposalIdOutOfBounds",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      }
    ],
    "name": "SessionNotActive",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "enum UnityQuest.GameStatus",
        "name": "expectedStatus",
        "type": "uint8"
      },
      {
        "internalType": "enum UnityQuest.GameStatus",
        "name": "currentStatus",
        "type": "uint8"
      }
    ],
    "name": "UnauthorizedStateTransition",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cycle",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "direction",
        "type": "string"
      }
    ],
    "name": "ChoiceMade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      }
    ],
    "name": "GameProposalAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "gameName",
        "type": "string"
      }
    ],
    "name": "GameProposed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      }
    ],
    "name": "GameSessionEnded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      }
    ],
    "name": "GameSessionStarted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "enum UnityQuest.GameStatus",
        "name": "previousStatus",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "enum UnityQuest.GameStatus",
        "name": "newStatus",
        "type": "uint8"
      }
    ],
    "name": "GameStatusChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "gamer",
        "type": "address"
      }
    ],
    "name": "GamerBanned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "gamer",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      }
    ],
    "name": "GamerJoinedSession",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cycle",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "direction",
        "type": "string"
      }
    ],
    "name": "OwnerChoice",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "BanGamer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_player",
        "type": "address"
      }
    ],
    "name": "DetermineLevelByExperience",
    "outputs": [
      {
        "internalType": "string",
        "name": "level",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_player",
        "type": "address"
      }
    ],
    "name": "DetermineRankByStake",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_sessionId",
        "type": "uint256"
      }
    ],
    "name": "EndGameSession",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "Gamers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "experienceLevel",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "currentSessionId",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "GetProposal",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_sessionId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_direction",
        "type": "string"
      }
    ],
    "name": "MakeChoice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      }
    ],
    "name": "ParticipateInGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_gameName",
        "type": "string"
      }
    ],
    "name": "ProposeGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_sessionId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_direction",
        "type": "string"
      }
    ],
    "name": "SetChoiceAsOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_minimumStakeAmount",
        "type": "uint256"
      }
    ],
    "name": "SetMinimumStakeAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "newQuorumPercentage",
        "type": "uint8"
      }
    ],
    "name": "SetQuorumPercentage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      }
    ],
    "name": "StartGameSession",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_gameId",
        "type": "uint256"
      }
    ],
    "name": "VoteForGame",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentSessionId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "experience",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "gameProposals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isAccepted",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "quorum",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "gameSessions",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "gameId",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "startVoteTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "currentCycle",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gameStatus",
    "outputs": [
      {
        "internalType": "enum UnityQuest.GameStatus",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "minimumStakeAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "questContract",
    "outputs": [
      {
        "internalType": "contract IQuest",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "quorumPercentage",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "stakingContract",
    "outputs": [
      {
        "internalType": "contract IStakingContract",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "startVoteTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voteDuration",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
""")  

contract_address = Web3.to_checksum_address("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0")
contract = web3.eth.contract(address=contract_address, abi=contract_abi)
connected_websockets = set()

async def serveur_websocket(websocket, path):
    # Ajoute le nouveau client WebSocket à l'ensemble des connexions
    connected_websockets.add(websocket)
    try:
        async for message in websocket:
            # Logique pour traiter les messages du client, si nécessaire
            print(f"Message reçu: {message}")
    finally:
        # Supprime le client WebSocket de l'ensemble lorsqu'il se déconnecte
        connected_websockets.remove(websocket)

async def handle_event_choice_made(event):
    # Traiter l'événement ChoiceMade
    print("ChoiceMade event:", event)
    # Extraire les données pertinentes de l'événement
    direction = event['args']['direction']
    # Convertir les données en chaîne de caractères JSON
    message = json.dumps({'type': 'ChoiceMade', 'direction': direction})
    # Envoyer le message à tous les clients WebSocket connectés
    await send_message_to_clients(message)

async def handle_event_owner_choice(event):
    # Traiter l'événement OwnerChoice
    print("OwnerChoice event:", event)
    # Extraire les données pertinentes de l'événement
    direction = event['args']['direction']
    print("Direction:", direction)
    # Convertir les données en chaîne de caractères JSON
    message = json.dumps({'type': 'OwnerChoice', 'direction': direction})
    # Envoyer le message à tous les clients WebSocket connectés
    await send_message_to_clients(message)

async def send_message_to_clients(message):
    if connected_websockets:  # Vérifie s'il y a des clients connectés
        # Crée une liste de tâches pour l'envoi du message à tous les clients connectés
        tasks = [asyncio.create_task(ws.send(message)) for ws in connected_websockets]
        # Attend que toutes les tâches soient complétées
        await asyncio.wait(tasks)

async def main():
    # Création de filtres pour chaque événement
    event_filter_choice_made = contract.events.ChoiceMade.create_filter(fromBlock='latest')
    event_filter_owner_choice = contract.events.OwnerChoice.create_filter(fromBlock='latest')
    
    # Lance le serveur WebSocket
    websocket_server = await websockets.serve(serveur_websocket, "localhost", 8765)
    print("Serveur WebSocket en écoute sur localhost:8765")
    
    while True:
        # Traiter les événements ChoiceMade
        for event in event_filter_choice_made.get_new_entries():
            await handle_event_choice_made(event)
        
        # Traiter les événements OwnerChoice
        for event in event_filter_owner_choice.get_new_entries():
            await handle_event_owner_choice(event)

        # Attendre avant de vérifier à nouveau les nouveaux événements
        await asyncio.sleep(2)
if __name__ == '__main__':
    asyncio.run(main())