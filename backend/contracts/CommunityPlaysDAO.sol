// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Jeton.sol";
import "./StakingContract.sol";

/**
 * @title Dao gaming
 * @author Khoule Medhi
 * @notice smart contract for Dao gaming
 */

interface IJeton {
    function Mint(address to, uint256 amount) external;
}

interface IStakingContract {
    function Mint(address to, uint256 amount) external;
    function Stake(uint256 amount) external;
    function Unstake(uint256 amount) external;
    function SetDailyInterestRate(uint256 newRate) external;
    function DailyInterestRate() external view returns (uint256);
    function CalculateReward(address gamer) external view returns (uint256);
    function StakingBalance(address user) external view returns (uint256);
    function totalStaked() external view returns (uint256);
}

contract CommunityPlaysDAO is Ownable {
    //L’instance ERC20Token et de staking à déployer
    IJeton public jetonContract;
    IStakingContract public stakingContract;

    mapping(uint256 => GameSession) public gameSessions;
    mapping(uint256 => GameProposal) public gameProposals;
    mapping(address => Gamer) public Gamers;
    mapping(address => uint256) public experience;

    uint256 public currentSessionId;
    uint256 private nextGameId = 1;
    uint256 public quorumPercentage = 50;
    GameStatus public gameStatus = GameStatus.NotStarted;

    event GameStatusChanged(GameStatus previousStatus, GameStatus newStatus);
    event GameSessionStarted(uint256 indexed sessionId, uint256 gameId);
    event GameSessionEnded(uint256 indexed sessionId);
    event GameChoiceSubmitted(
        uint256 indexed sessionId,
        address indexed voter,
        string direction
    );
    event GamerJoinedSession(address indexed gamer, uint256 indexed sessionId);
    event ChoiceMade(
        uint256 indexed sessionId,
        uint256 cycle,
        string direction
    );
    event GameProposalAccepted(uint256 indexed gameId);

    modifier onlyStakingGamer() {
        require(
            stakingContract.StakingBalance(msg.sender) > 0,
            "Must have tokens staked to participate"
        );
        _;
    }

modifier inGameStatus(GameStatus expectedStatus) {
    require(gameStatus == expectedStatus, "Transition d'etat non autorisee");
    _;
}
    // énumération des différents états possibles d'un jeu
    enum GameStatus {
        NotStarted, // Le jeu n'a pas encore démarré
        Started, // Le jeu est en cours
        Finished, // Le jeu est terminé
        RewardTime // Le moment des récompenses
    }

    // Structure de données pour représenter une session de jeu
    struct GameSession {
        uint256 id;
        uint256 gameId;
        bool isActive;
        address[] gamerInSession;
        mapping(string => uint256) choicesCount; // Nombre de choix pour chaque direction
        mapping(uint256 => string) winningDirectionPerCycle; // Direction gagnante par cycle
        mapping(address => mapping(uint256 => string)) playerChoicesPerCycle; // Choix des joueurs par cycle
        mapping(address => uint256) lastCycleParticipated; // Dernier cycle de vote auquel chaque joueur a participé
        uint256 currentCycle; // Identifiant du cycle actuel de vote
    }

    // Structure de données pour représenter un jeu proposé
    struct GameProposal {
        uint256 id;
        string name;
        uint256 voteCount;
        bool isAccepted;
        uint256 quorum;
    }

    // Structure pour représenter un utilisateur et son engagement
    struct Gamer {
        // uint256 stakeAmount; // Montant du token staké
        uint256 experienceLevel; // Niveau d'expérience
        bool isActive; // indique si le joueur est actif dans une session
        uint256 currentSessionId; // ID de la session de jeu actuelle
    }

    // Initialiser le contrat avec des paramètres de base
    constructor(
        address _tokenAddress,
        address _stakingContractAddress
    ) Ownable(msg.sender) {
        jetonContract = IJeton(_tokenAddress);
        stakingContract = IStakingContract(_stakingContractAddress);
    }

    ///Propositions et Votes
    // Proposition par la communauté
    function ProposeGame(string memory _gameName) public onlyStakingGamer {
        require(
            keccak256(abi.encode(_gameName)) != keccak256(abi.encode("")),
            "Proposal can not be empty"
        );
        uint256 quorum = CalculateQuorum();
        gameProposals[nextGameId] = GameProposal({
            id: nextGameId,
            name: _gameName,
            voteCount: 0,
            isAccepted: false,
            quorum: quorum
        });

        nextGameId++;
    }

    // Voter pour un jeu en fonction de son poids de staking
    function VoteForGame(uint256 _gameId) public onlyStakingGamer {
        require(gameProposals[_gameId].id != 0, "Game proposal does not exist");
        uint256 stakedAmount = stakingContract.StakingBalance(msg.sender);
        require(stakedAmount > 0, "You must have tokens staked to vote");

        // Utiliser le solde staké comme poids de vote
        gameProposals[_gameId].voteCount += stakedAmount;

        // Vérifier si le quorum est atteint en fonction des votes pondérés
        if (gameProposals[_gameId].voteCount >= gameProposals[_gameId].quorum) {
            gameProposals[_gameId].isAccepted = true;
            emit GameProposalAccepted(_gameId);
        }
    }

    // Retourne les détails d'une proposition de jeu par son ID
    function GetProposal(
        uint256 proposalId
    ) public view returns (uint256, string memory, uint256, bool, uint256) {
        require(
            proposalId > 0 && proposalId < nextGameId,
            "Proposal ID is out of bounds."
        );

        GameProposal storage proposal = gameProposals[proposalId];
        return (
            proposal.id,
            proposal.name,
            proposal.voteCount,
            proposal.isAccepted,
            proposal.quorum
        );
    }

    ///Gestion du Quorum
    function CalculateQuorum() private view returns (uint256) {
        uint256 totalStaked = stakingContract.totalStaked();
        uint256 quorum = (totalStaked * quorumPercentage) / 100;
        return quorum;
    }

    function SetQuorumPercentage(uint256 newQuorumPercentage) public onlyOwner {
        require(
            newQuorumPercentage > 0 && newQuorumPercentage <= 100,
            "Quorum percentage must be between 1 and 100"
        );
        quorumPercentage = newQuorumPercentage;
    }

    ///Gestion des Sessions de Jeu
    // Fonction pour démarrer une nouvelle session de jeu avec un jeu spécifique
    function StartGameSession(uint256 gameId) public onlyOwner inGameStatus(GameStatus.NotStarted) { //// external ?
        require(gameProposals[gameId].id != 0, "The game does not exist.");
        currentSessionId++; // Incrémenter l'ID pour une nouvelle session

        GameSession storage session = gameSessions[currentSessionId];
        session.id = currentSessionId;
        session.isActive = true;
        session.gameId = gameId; // Stocker l'ID du jeu dans la session
        session.currentCycle = 1; // Initialiser le cycle de vote à 1
        gameStatus = GameStatus.Started;
        emit GameStatusChanged(GameStatus.NotStarted, GameStatus.Started);
        emit GameSessionStarted(currentSessionId, gameId);
    }

    // Fonction pour terminer une session de jeu spécifique et distribuer les récompenses
    function EndGameSession(uint256 _sessionId) external onlyOwner inGameStatus(GameStatus.Started) {
        require(gameSessions[_sessionId].isActive, "Session not active.");
        GameSession storage session = gameSessions[_sessionId];
        session.isActive = false;

        uint256 baseExperienceReward = 10; // Récompense de base pour la participation
        uint256 bonusExperience = 100; // Bonus pour avoir choisi la direction majoritaire

        // Distribuer les récompenses
        for (uint256 i = 0; i < session.gamerInSession.length; i++) {
            address gamerAddress = session.gamerInSession[i];
            uint256 totalCorrectChoices = CountCorrectChoices(
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

    function CountCorrectChoices(
        uint256 _sessionId,
        address _gamer
    ) private view returns (uint256) {
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

    function ResetSessionChoices(uint256 _sessionId) private {
        GameSession storage session = gameSessions[_sessionId];

        // Réinitialiser les comptes de choix pour chaque direction pour le nouveau cycle
        session.choicesCount["haut"] = 0;
        session.choicesCount["bas"] = 0;
        session.choicesCount["gauche"] = 0;
        session.choicesCount["droite"] = 0;
    }

    ///Participation et Choix des Joueurs
    // Fonction pour participer à une partie
    function ParticipateInGame(uint256 sessionId) external onlyStakingGamer {
        require(
            gameSessions[sessionId].isActive,
            "This session is not active."
        );
        gameSessions[sessionId].gamerInSession.push(msg.sender);

        emit GamerJoinedSession(msg.sender, sessionId);
    }

    function MakeChoice(
        uint256 _sessionId,
        string memory _direction
    ) external onlyStakingGamer {
        require(gameSessions[_sessionId].isActive, "Session not active");
        GameSession storage session = gameSessions[_sessionId];
        if (!IsGamerInSession(msg.sender, _sessionId)) {
            session.gamerInSession.push(msg.sender);
        }
        require(
            session.lastCycleParticipated[msg.sender] < session.currentCycle,
            "Already participated in the current cycle"
        );

        session.playerChoicesPerCycle[msg.sender][
            session.currentCycle
        ] = _direction;
        session.choicesCount[_direction]++;
        session.lastCycleParticipated[msg.sender] = session.currentCycle;

        if (
            session.choicesCount[_direction] > session.gamerInSession.length / 2
        ) {
            session.winningDirectionPerCycle[session.currentCycle] = _direction;
            emit ChoiceMade(_sessionId, session.currentCycle, _direction);
            ResetSessionChoices(_sessionId);
            session.currentCycle++;
        }
    }

    // Fonction pour vérifier si un joueur participe déjà à la session
    function IsGamerInSession(
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

    ///Expérience et Rang
    // Fonction pour déterminer le rang du joueur basé sur le montant staké
    function DetermineRankByStake(
        address _player
    ) public view returns (string memory) {
        uint256 stakedAmount = stakingContract.StakingBalance(_player); // Assurez-vous d'avoir accès à cette fonction dans IStakingContract
        if (stakedAmount >= 500 * 10 ** 18) return "Diamant";
        if (stakedAmount >= 400 * 10 ** 18) return "Platine";
        if (stakedAmount >= 300 * 10 ** 18) return "Or";
        if (stakedAmount >= 200 * 10 ** 18) return "Argent";
        if (stakedAmount >= 100 * 10 ** 18) return "Bronze";
        return "Aucun rang";
    }

    // Fonction pour déterminer le niveau du joueur basé sur son expérience
    function DetermineLevelByExperience(
        address _player
    ) public view returns (string memory level) {
        uint256 playerExperience = experience[_player];
        if (playerExperience >= 5000) {
            level = "Niveau 10";
        } else if (playerExperience >= 4500) {
            level = "Niveau 9";
        } else if (playerExperience >= 4000) {
            level = "Niveau 8";
        } else if (playerExperience >= 3500) {
            level = "Niveau 7";
        } else if (playerExperience >= 3000) {
            level = "Niveau 6";
        } else if (playerExperience >= 2500) {
            level = "Niveau 5";
        } else if (playerExperience >= 2000) {
            level = "Niveau 4";
        } else if (playerExperience >= 1500) {
            level = "Niveau 3";
        } else if (playerExperience >= 1000) {
            level = "Niveau 2";
        } else {
            level = "Niveau 1"; // Moins de 1000 points d'expérience correspond au niveau le plus bas
        }
    }
    /// Gestion Administrative
    function BanGamer(address _address) external onlyOwner {
        delete Gamers[_address];
    }
}
