// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Quest.sol";
import "./StakingContract.sol";

/**
 * @title  UnityQuest
 * @author Khoule Medhi
 * @notice Contrat intelligent pour un système de DAO dédié au gaming. Permet la création de sessions de jeu,
 * la participation des a des sessions de jeu et etre récompensé pour cela,
 * ainsi que la gestion des propositions de jeu a travers une DAO
 */

interface IQuest {
    function Mint(address to, uint256 amount) external;
    function BuyTokens() external;
    function Withdraw() external;
}

interface IStakingContract {
    function DailyInterestRate() external view returns (uint16);
    function SetDailyInterestRate(uint16 newRate) external;
    function Mint(address to, uint256 amount) external;
    function Stake(uint256 amount) external;
    function Unstake(uint256 amount) external;
    function CalculateReward(address gamer) external view returns (uint256);
    function stakingBalance(address user) external view returns (uint256);
    function totalStaked() external view returns (uint256);
}

contract UnityQuest is Ownable {
    IQuest public questContract;
    IStakingContract public stakingContract;

    uint8 public quorumPercentage = 20;
    uint32 private nextGameId = 1;
    uint256 public currentSessionId;
    uint256 public voteDuration = 20;
    uint256 public minimumStakeAmount = 1000 * 10 ** 18;

    struct GameSession {
        uint256 id;
        uint256 gameId;
        bool isActive;
        uint256 startVoteTime;
        address[] gamerInSession;
        mapping(string => uint256) choicesCount;
        mapping(uint256 => string) winningDirectionPerCycle;
        mapping(address => mapping(uint256 => string)) playerChoicesPerCycle;
        mapping(address => uint256) lastCycleParticipated;
        uint256 currentCycle;
    }

    struct GameProposal {
        uint256 id;
        string name;
        uint256 voteCount;
        bool isAccepted;
        uint256 quorum;
    }

    struct Gamer {
        uint256 experienceLevel;
        bool isActive;
        uint256 currentSessionId;
    }

    GameStatus public gameStatus = GameStatus.NotStarted;

    mapping(uint256 => GameSession) public gameSessions;
    mapping(uint256 => uint256) public startVoteTime;
    mapping(uint256 => GameProposal) public gameProposals;
    mapping(address => Gamer) public Gamers;
    mapping(address => uint256) public experience;

    event GamerBanned(address indexed gamer);
    event GameStatusChanged(GameStatus previousStatus, GameStatus newStatus);
    event GameSessionStarted(uint256 indexed sessionId, uint256 gameId);
    event GameSessionEnded(uint256 indexed sessionId);
    event GamerJoinedSession(address indexed gamer, uint256 indexed sessionId);
    event ChoiceMade(
        uint256 indexed sessionId,
        uint256 cycle,
        string direction
    );

    event OwnerChoice(
        uint256 indexed sessionId,
        uint256 cycle,
        string direction
    );

    event GameProposed(uint256 proposalId, string gameName);
    event GameProposalAccepted(uint256 indexed gameId);

    modifier inGameStatus(GameStatus expectedStatus) {
        if (gameStatus != expectedStatus) {
            revert UnauthorizedStateTransition(expectedStatus, gameStatus);
        }
        _;
    }
    modifier onlyStakingGamer() {
        uint256 stakedAmount = stakingContract.stakingBalance(msg.sender);
        if (stakedAmount < minimumStakeAmount) {
            revert InsufficientStake(stakedAmount, minimumStakeAmount);
        }
        _;
    }

    enum GameStatus {
        NotStarted,
        Started,
        Finished
    }

    error EmptyProposal();
    error GameProposalDoesNotExist();
    error InsufficientStake(uint256 stakedAmount, uint256 requiredMinimumStake);
    error SessionNotActive(uint256 sessionId);
    error ProposalIdOutOfBounds(uint256 proposalId, uint256 nextGameId);
    error GameDoesNotExist(uint256 gameId);
    error InvalidChoice(string direction);

    error UnauthorizedStateTransition(
        GameStatus expectedStatus,
        GameStatus currentStatus
    );
    error AlreadyParticipatedInCurrentCycle(
        address gamer,
        uint256 currentCycle
    );

    /**
     * @notice Initialise le contrat avec l'adresse du quest et du contrat de staking.
     * @param _tokenAddress Adresse du contrat du quest ERC20.
     * @param _stakingContractAddress Adresse du contrat de staking.
     */
    constructor(
        address _tokenAddress,
        address _stakingContractAddress
    ) Ownable(msg.sender) {
        questContract = IQuest(_tokenAddress);
        stakingContract = IStakingContract(_stakingContractAddress);
    }

    /**
     * @notice Permet à un utilisateur de proposer un jeu.
     * @dev Seuls les utilisateurs ayant sktatés des quests peuvent proposer un jeu. Émet un événement `GameProposed`.
     * @param _gameName Nom du jeu proposé.
     */
    function ProposeGame(string memory _gameName) public onlyStakingGamer {
        if (bytes(_gameName).length == 0) {
            revert EmptyProposal();
        }
        uint256 quorum = CalculateQuorum();
        gameProposals[nextGameId] = GameProposal({
            id: nextGameId,
            name: _gameName,
            voteCount: 0,
            isAccepted: false,
            quorum: quorum
        });

        emit GameProposed(nextGameId, _gameName);
        nextGameId++;
    }

    /**
     * @notice Permet à un utilisateur de voter pour une proposition de jeu.
     * @dev Le vote est pondéré par le montant skaté par l'utilisateur. Émet un événement `GameProposalAccepted` si le quorum est atteint.
     * @param _gameId Identifiant de la proposition de jeu.
     */
    function VoteForGame(uint256 _gameId) public onlyStakingGamer {
        if (gameProposals[_gameId].id == 0) {
            revert GameProposalDoesNotExist();
        }
        uint256 stakedAmount = stakingContract.stakingBalance(msg.sender);
        gameProposals[_gameId].voteCount += stakedAmount;

        if (gameProposals[_gameId].voteCount >= gameProposals[_gameId].quorum) {
            gameProposals[_gameId].isAccepted = true;
            emit GameProposalAccepted(_gameId);
        }
    }

    /**
     * @notice Renvoie les détails d'une proposition de jeu spécifique.
     * @dev Revert avec une `ProposalIdOutOfBounds` si l'ID de la proposition est invalide.
     * @param proposalId Identifiant de la proposition de jeu.
     * @return Détails de la proposition de jeu.
     */
    function GetProposal(
        uint256 proposalId
    ) public view returns (uint256, string memory, uint256, bool, uint256) {
        if (proposalId <= 0 || proposalId >= nextGameId) {
            revert ProposalIdOutOfBounds(proposalId, nextGameId);
        }

        GameProposal storage proposal = gameProposals[proposalId];
        return (
            proposal.id,
            proposal.name,
            proposal.voteCount,
            proposal.isAccepted,
            proposal.quorum
        );
    }

    /**
     * @notice Calcule le quorum nécessaire pour accepter une proposition de jeu.
     * @dev Le quorum est basé sur un pourcentage du total skaté.
     * @return quorum calculé.
     */
    function CalculateQuorum() private view returns (uint256) {
        uint256 totalStaked = stakingContract.totalStaked();
        uint256 quorum = (totalStaked * quorumPercentage) / 100;
        return quorum;
    }

    /**
     * @notice Définit un nouveau pourcentage de quorum.
     * @dev Seul le propriétaire du contrat peut modifier le pourcentage de quorum.
     * @param newQuorumPercentage Nouveau pourcentage pour le quorum.
     */
    function SetQuorumPercentage(uint8 newQuorumPercentage) public onlyOwner {
        require(
            newQuorumPercentage > 0 && newQuorumPercentage <= 100,
            "Quorum percentage must be between 1 and 100"
        );
        quorumPercentage = newQuorumPercentage;
    }

    /**
     * @notice Démarre une nouvelle session de jeu pour un jeu spécifique.
     * @dev Revert avec une `GameDoesNotExist` si le jeu spécifié n'existe pas. Change le statut du jeu à `Started`.
     * @param gameId Identifiant du jeu pour lequel démarrer une session.
     */
    function StartGameSession(
        uint256 gameId
    ) public onlyOwner inGameStatus(GameStatus.NotStarted) {
        if (gameProposals[gameId].id == 0) {
            revert GameDoesNotExist(gameId);
        }
        currentSessionId++;

        GameSession storage session = gameSessions[currentSessionId];
        session.id = currentSessionId;
        session.isActive = true;
        session.gameId = gameId;
        session.currentCycle = 1;
        gameStatus = GameStatus.Started;
        emit GameStatusChanged(GameStatus.NotStarted, GameStatus.Started);
        emit GameSessionStarted(currentSessionId, gameId);
    }

    /**
     * @notice Termine une session de jeu en cours et distribue les récompenses aux participants.
     * @dev Doit être appelée par le propriétaire du contrat. La session doit être dans l'état `Started`.
     * Calcule les récompenses en fonction des choix corrects des participants et met à jour leur expérience.
     * Change l'état du jeu à `Finished`.
     * @param _sessionId Identifiant de la session de jeu à terminer.
     */
    function EndGameSession(
        uint256 _sessionId
    ) external onlyOwner inGameStatus(GameStatus.Started) {
        GameSession storage session = gameSessions[_sessionId];
        session.isActive = false;

        uint256 baseExperienceReward = 100; // Récompense de base pour la participation
        uint256 bonusExperience = 1000; // Bonus pour avoir choisi la direction majoritaire, haute pour montrer son impacte sur la soutenance

        for (uint256 i = 0; i < session.gamerInSession.length; i++) {
            address gamerAddress = session.gamerInSession[i];
            uint256 totalCorrectChoices = CountCorrectChoices(
                _sessionId,
                gamerAddress
            );

            uint256 totalReward = baseExperienceReward;

            if (totalCorrectChoices > 0) {
                totalReward += bonusExperience * totalCorrectChoices;
            }

            experience[gamerAddress] += totalReward;
        }

        gameStatus = GameStatus.Finished;
        emit GameStatusChanged(GameStatus.Started, GameStatus.Finished);
        emit GameSessionEnded(_sessionId);
    }

    /**
     * @notice Compte le nombre total de choix corrects faits par un joueur dans une session de jeu donnée.
     * @dev Utilisée dans `EndGameSession` pour calculer les récompenses des participants en fonction de leur performance.
     * @param _sessionId Identifiant de la session de jeu.
     * @param _gamer Adresse du joueur dont on compte les choix corrects.
     * @return nombre de choix corrects effectués par le joueur dans la session.
     */
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

    /**
     * @notice Réinitialise les comptes de choix pour chaque direction pour un nouveau cycle de vote dans une session de jeu.
     * @dev Appelée à la fin de chaque cycle de vote pour préparer la session pour le cycle suivant.
     * @param _sessionId Identifiant de la session de jeu à réinitialiser.
     */
    function ResetSessionChoices(uint256 _sessionId) private {
        GameSession storage session = gameSessions[_sessionId];

        session.choicesCount["haut"] = 0;
        session.choicesCount["bas"] = 0;
        session.choicesCount["gauche"] = 0;
        session.choicesCount["droite"] = 0;
    }

    /**
     * @notice Permet à un joueur de participer à une session de jeu active.
     * @dev Le joueur doit avoir des quests stakés pour participer. La session doit être active.
     * Ajoute le joueur à la liste des participants de la session.
     * @param sessionId Identifiant de la session de jeu.
     */
    function ParticipateInGame(uint256 sessionId) external onlyStakingGamer {
        if (!gameSessions[sessionId].isActive) {
            revert SessionNotActive(sessionId);
        }
        gameSessions[sessionId].gamerInSession.push(msg.sender);
        emit GamerJoinedSession(msg.sender, sessionId);
    }

    /**
     * @notice Permet à un joueur de faire un choix de direction prédéfini (haut, bas, gauche, droite) dans une session de jeu active.
     * @dev
     * - Les joueurs peuvent voter une fois par cycle de vote. Un cycle de vote est déterminé par `voteDuration` et commence à `startVoteTime`.
     * - `block.timestamp` est utilisé pour s'assurer que le vote est effectué dans le cycle de temps approprié.
     * - Les votes sont comptabilisés par choix de direction, et chaque vote d'un joueur est stocké pour permettre la vérification de la participation au cycle courant.
     * - À la fin de chaque cycle de vote, si le temps alloué au vote est écoulé (`block.timestamp >= session.startVoteTime + voteDuration`) ou si tous les participants ont voté, la direction ayant le plus de votes est choisie comme direction gagnante pour le cycle.
     * - Si la majorité n'est pas atteinte ou en cas d'égalité, une direction prédéfinie est appliquée comme mécanisme de secours. Actuellement, cette direction de secours est fixée à "haut" par `DetermineWinningDirection`.
     * - Après la détermination de la direction gagnante, la session est préparée pour le prochain cycle de vote: le compteur de cycle est incrémenté, les choix des joueurs sont réinitialisés, et `startVoteTime` est remis à zéro pour le nouveau cycle.
     * La fonction révert avec `AlreadyParticipatedInCurrentCycle` si un joueur tente de voter plus d'une fois dans le même cycle.
     *
     * @param _sessionId Identifiant de la session de jeu pour laquelle le joueur fait un choix. Ce doit être une session active.
     * @param _direction Le choix de direction fait par le joueur. Doit être une des valeurs valides prédéfinies (actuellement non vérifié dans ce snippet).
     */
    function MakeChoice(
        uint256 _sessionId,
        string memory _direction
    ) external onlyStakingGamer inGameStatus(GameStatus.Started) {
        if (
            keccak256(abi.encodePacked(_direction)) !=
            keccak256(abi.encodePacked("haut")) &&
            keccak256(abi.encodePacked(_direction)) !=
            keccak256(abi.encodePacked("bas")) &&
            keccak256(abi.encodePacked(_direction)) !=
            keccak256(abi.encodePacked("gauche")) &&
            keccak256(abi.encodePacked(_direction)) !=
            keccak256(abi.encodePacked("droite"))
        ) {
            revert InvalidChoice(_direction);
        }
        GameSession storage session = gameSessions[_sessionId];

        if (session.startVoteTime == 0) {
            session.startVoteTime = block.timestamp;
        }

        if (
            IsGamerInSession(msg.sender, _sessionId) &&
            session.lastCycleParticipated[msg.sender] >= session.currentCycle
        ) {
            revert AlreadyParticipatedInCurrentCycle(
                msg.sender,
                session.currentCycle
            );
        }

        if (!IsGamerInSession(msg.sender, _sessionId)) {
            session.gamerInSession.push(msg.sender);
        }

        session.playerChoicesPerCycle[msg.sender][
            session.currentCycle
        ] = _direction;
        session.choicesCount[_direction]++;
        session.lastCycleParticipated[msg.sender] = session.currentCycle;

        if (
            block.timestamp >= session.startVoteTime + voteDuration ||
            session.gamerInSession.length == CountTotalVotes(session)
        ) {
            string memory winningDirection = DetermineWinningDirection();
            ApplyWinningDirection(_sessionId, winningDirection);
        }
    }

    /**
     * @notice Compte le nombre total de votes exprimés dans le cycle courant de la session de jeu.
     * @dev Utilise la liste des participants et vérifie ceux qui ont participé au cycle courant.
     * @param session La session de jeu dont il faut compter les votes.
     * @return totalVotes nombre total de votes exprimés dans le cycle courant.
     */
    function CountTotalVotes(
        GameSession storage session
    ) private view returns (uint256 totalVotes) {
        totalVotes = 0;
        for (uint i = 0; i < session.gamerInSession.length; i++) {
            if (
                session.lastCycleParticipated[session.gamerInSession[i]] ==
                session.currentCycle
            ) {
                totalVotes++;
            }
        }
        return totalVotes;
    }

    /**
     * @notice Détermine la direction gagnante pour le cycle de vote actuel de manière déterministe.
     * @dev Actuellement, cette fonction retourne toujours "haut" pour simplifier. À l'avenir, elle pourrait implémenter une logique plus complexe.
     * @return direction gagnante déterminée.
     */
    function DetermineWinningDirection() private pure returns (string memory) {
        return "haut";
    }

    /**
     * @notice Applique la direction gagnante pour le cycle courant de la session de jeu et prépare le cycle suivant.
     * @dev Cette fonction est appelée en interne pour finaliser le cycle de vote en cours.
     * @param _sessionId L'identifiant de la session de jeu en cours.
     * @param winningDirection La direction gagnante pour le cycle courant.
     */

    function ApplyWinningDirection(
        uint256 _sessionId,
        string memory winningDirection
    ) private {
        GameSession storage session = gameSessions[_sessionId];
        session.winningDirectionPerCycle[
            session.currentCycle
        ] = winningDirection;
        emit ChoiceMade(_sessionId, session.currentCycle, winningDirection);

        session.startVoteTime = 0;
        session.currentCycle++;
        ResetSessionChoices(_sessionId);
    }

    /**
     * @notice Vérifie si un joueur participe déjà à la session de jeu spécifiée.
     * @dev Utilisé pour empêcher un joueur de participer plusieurs fois au même cycle de vote.
     * @param _gamer Adresse du joueur.
     * @param _sessionId Identifiant de la session de jeu.
     * @return bool Vrai si le joueur participe déjà, faux sinon.
     */
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

    /**
     * @notice Détermine le rang d'un joueur basé sur le montant des quests qu'il a skatés.
     * @dev Les rangs sont attribués selon différents seuils de montant skaté.
     * @param _player L'adresse du joueur dont on veut déterminer le rang.
     * @return Le rang du joueur sous forme de chaîne de caractères.
     */
    function DetermineRankByStake(
        address _player
    ) public view returns (string memory) {
        uint256 stakedAmount = stakingContract.stakingBalance(_player);
        if (stakedAmount >= 500 * 10 ** 18) return "Diamant";
        if (stakedAmount >= 400 * 10 ** 18) return "Platine";
        if (stakedAmount >= 300 * 10 ** 18) return "Or";
        if (stakedAmount >= 200 * 10 ** 18) return "Argent";
        if (stakedAmount >= 100 * 10 ** 18) return "Bronze";
        return "Aucun rang";
    }

    /**
     * @notice Détermine le niveau d'expérience d'un joueur en fonction de son expérience accumulée.
     * @dev L'expérience est accumulée par la participation à des sessions de jeu et par d'autres actions au sein de la DAO.
     * @param _player L'adresse du joueur dont on veut déterminer le niveau.
     * @return level du niveau d'expérience du joueur, représenté par une chaîne de caractères.
     */
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

    /**
     * @notice Exclut un joueur de la DAO, le privant de la possibilité de participer à des sessions de jeu et à des votes.
     * @dev Seul le propriétaire du contrat peut bannir un joueur. Cette action est irréversible.
     * @param _address L'adresse du joueur à bannir.
     */
    function BanGamer(address _address) external onlyOwner {
        delete Gamers[_address];
        emit GamerBanned(_address);
    }

    /**
     * @notice Permet au propriétaire du contrat de définir directement la direction gagnante pour une session de jeu.
     * @dev Cette fonction est destinée à être utilisée par le propriétaire pour des ajustements ou interventions manuelles.
     * Elle bypass les vérifications habituelles de participation et de vote.
     * emet l'évenement ChoiceMade pour signaler que la direction a été définie avec succès et enregistrer l'action.
     * @param _sessionId L'ID de la session de jeu concernée.
     * @param _direction La direction que le propriétaire souhaite appliquer comme gagnante pour le cycle courant.
     */
    function SetChoiceAsOwner(
        uint256 _sessionId,
        string memory _direction
    ) external onlyOwner {
        GameSession storage session = gameSessions[_sessionId];

        session.winningDirectionPerCycle[session.currentCycle] = _direction;
        emit OwnerChoice(_sessionId, session.currentCycle, _direction);

        ResetSessionChoices(_sessionId);
        session.currentCycle++;
    }

    /**
     * @notice Définit le montant minimal de tokens que les utilisateurs doivent staker pour participer à la DAO.
     * @dev Cette fonction peut uniquement être appelée par le propriétaire du contrat.
     * @param _minimumStakeAmount Le nouveau montant minimal de staking en wei.
     */
    function SetMinimumStakeAmount(
        uint256 _minimumStakeAmount
    ) public onlyOwner {
        minimumStakeAmount = _minimumStakeAmount;
    }
}
