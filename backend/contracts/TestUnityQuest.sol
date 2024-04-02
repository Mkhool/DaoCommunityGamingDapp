// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./UnityQuest.sol";

contract TestUnityQuest is UnityQuest {
    constructor(
        address _tokenAddress,
        address _stakingContractAddress
    ) UnityQuest(_tokenAddress, _stakingContractAddress) {}

    // Exposer l'adresse du contrat Quest
    function getQuestContractAddress() public view returns (address) {
        return address(questContract);
    }

    // Exposer l'adresse du contrat StakingContract
    function getStakingContractAddress() public view returns (address) {
        return address(stakingContract);
    }

    function addExperienceForTesting(
        address gamer,
        uint256 experienceToAdd
    ) external onlyOwner {
        experience[gamer] += experienceToAdd;
    }

    function resetExperienceForTesting(address gamer) public {
        experience[gamer] = 0;
    }
    function testCalculateQuorum() public view returns (uint256) {
        uint256 totalStaked = stakingContract.totalStaked();
        uint256 quorum = (totalStaked * quorumPercentage) / 100;
        return quorum;
    }
 
    
    function XtestIsGamerInSession(
        address _gamer,
        uint256 _sessionId
    ) public view returns (bool) {
        address[] memory gamers = gameSessions[_sessionId].gamerInSession;
        for (uint256 i = 0; i < gamers.length; i++) {
            if (gamers[i] == _gamer) {
                return true;
            }
        }
        return false;
    }

function setWinningDirectionForCycle(uint256 _sessionId, uint256 _cycle, string memory _winningDirection) public {
    GameSession storage session = gameSessions[_sessionId];
    session.winningDirectionPerCycle[_cycle] = _winningDirection;
}

   function testResetSessionChoices(uint256 _sessionId) private {
        GameSession storage session = gameSessions[_sessionId];

        session.choicesCount["haut"] = 0;
        session.choicesCount["bas"] = 0;
        session.choicesCount["gauche"] = 0;
        session.choicesCount["droite"] = 0;
    }



  // Fonction MakeChoice modifiée pour gérer le timer de vote
 function testMakeChoice(uint256 _sessionId, string memory _direction) external onlyStakingGamer inGameStatus(GameStatus.Started) {
        GameSession storage session = gameSessions[_sessionId];
        
        // Démarrage du timer au premier vote
        if (session.startVoteTime == 0) {
            session.startVoteTime = block.timestamp;
        }

            if (testIsGamerInSession(msg.sender, _sessionId) && session.lastCycleParticipated[msg.sender] >= session.currentCycle) {
        revert AlreadyParticipatedInCurrentCycle(msg.sender, session.currentCycle);
    }

        if (!testIsGamerInSession(msg.sender, _sessionId)) {
            session.gamerInSession.push(msg.sender);
        }

        session.playerChoicesPerCycle[msg.sender][session.currentCycle] = _direction;
        session.choicesCount[_direction]++;
        session.lastCycleParticipated[msg.sender] = session.currentCycle;

        if (block.timestamp >= session.startVoteTime + voteDuration || session.gamerInSession.length == testCountTotalVotes(session)) {
            string memory winningDirection = testDetermineWinningDirection();
            testApplyWinningDirection(_sessionId, winningDirection);
        }
    }

    // Comptabilise le total des votes pour le cycle actuel
    function testCountTotalVotes(GameSession storage session) private view returns (uint256 totalVotes) {
        totalVotes = 0;
        for (uint i = 0; i < session.gamerInSession.length; i++) {
            if (session.lastCycleParticipated[session.gamerInSession[i]] == session.currentCycle) {
                totalVotes++;
            }
        }
        return totalVotes;
    }

    // Fallback par defaut
    function testDetermineWinningDirection() public  pure returns (string memory) {
        // Implémentez la logique pour choisir la direction avec le plus de votes ou "haut" par défaut
        return "haut";
    }

    // Applique la direction gagnante et réinitialise pour le prochain cycle
    function testApplyWinningDirection(uint256 _sessionId, string memory winningDirection) public  {
        GameSession storage session = gameSessions[_sessionId];
        session.winningDirectionPerCycle[session.currentCycle] = winningDirection;
        emit ChoiceMade(_sessionId, session.currentCycle, winningDirection);
        
        // Réinitialisation pour le prochain cycle
        session.startVoteTime = 0;
        session.currentCycle++;
        testResetSessionChoices(_sessionId); // Assurez-vous d'implémenter cette fonction correctement
    }

    function testCountCorrectChoices(
        uint256 _sessionId,
        address _gamer
    ) public  view returns (uint256) {
        GameSession storage session = gameSessions[_sessionId];
        uint256 correctChoices = 0;

        for (uint256 cycle = 1; cycle <= session.currentCycle; cycle++) {
            string memory playerChoice = session.playerChoicesPerCycle[_gamer][
                cycle
            ];
            string memory winningDirection = session.winningDirectionPerCycle[
                cycle
            ];

            if (
                keccak256(abi.encodePacked(playerChoice)) ==
                keccak256(abi.encodePacked(winningDirection))
            ) {
                correctChoices++;
            }
        }

        return correctChoices;
    }

    function testIsGamerInSession(
        address _gamer,
        uint256 _sessionId
    ) private view returns (bool) {
        address[] memory gamers = gameSessions[_sessionId].gamerInSession;
        for (uint256 i = 0; i < gamers.length; i++) {
            if (gamers[i] == _gamer) {
                return true;
            }
        }
        return false;
    }

function testEndGameSession(
        uint256 _sessionId
    ) external onlyOwner inGameStatus(GameStatus.Started) {
        GameSession storage session = gameSessions[_sessionId];
        session.isActive = false;

        uint256 baseExperienceReward = 10; // Récompense de base pour la participation
        uint256 bonusExperience = 100; // Bonus pour avoir choisi la direction majoritaire

        // Distribuer les récompenses
        for (uint256 i = 0; i < session.gamerInSession.length; i++) {
            address gamerAddress = session.gamerInSession[i];
            uint256 totalCorrectChoices = testCountCorrectChoices(
                _sessionId,
                gamerAddress
            );

            // Chaque joueur reçoit une récompense de base pour la participation
            uint256 totalReward = baseExperienceReward;

            // Ajout d'un bonus basé sur les choix corrects
            if (totalCorrectChoices > 0) {
                totalReward += bonusExperience * totalCorrectChoices;
            }

            // Ajouter l'expérience au joueur
            experience[gamerAddress] += totalReward;
        }

        gameStatus = GameStatus.Finished;
        emit GameStatusChanged(GameStatus.Started, GameStatus.Finished);
        emit GameSessionEnded(_sessionId);
    }

}
