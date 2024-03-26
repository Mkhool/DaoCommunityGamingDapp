// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./JetonToken.sol";

/* 
faire un modifier onlyGamer
verifier les requires
faire les events
*/
interface IJetonToken {
    function mint(address to, uint256 amount) external;
    function stake(uint256 amount) external;
    function unstake(uint256 amount) external;
}

contract CommunityPlaysDAO is Ownable {
    //L’instance ERC20Token à déployer
    IJetonToken public jetonTokenContract;
    address[] public listOfGamers;
    mapping(uint256 => GameSession) public gameSessions;
    mapping(uint256 => GameProposal) public gameProposals;
    mapping(address => Gamer) public Gamers;
    mapping(uint256 => Partner) public partners; // Mapping d'ID de jeu à l'éditeur
    mapping(address => uint256) public experience; // Suivi de l'expérience des joueurs
    uint256[] private partnerGameIds; // Stocke les IDs de jeux proposés par les éditeurs

    uint256 constant EXP_PER_LEVEL = 100;
    uint256 public currentSessionId;
    uint256 private nextGameId = 1;

    event GameSessionStarted(uint256 indexed sessionId, uint256 gameId);
    event GameSessionEnded(uint256 indexed sessionId);
    event TokenRewardsDistributed(address indexed gamer, uint256 rewardAmount);
    event ExperienceAdded(address indexed gamer, uint256 expAmount);
    event GameVoted(uint256 indexed gameId, address indexed voter);
    event GamerJoinedSession(address indexed gamer, uint256 indexed sessionId);
    event ExperienceAndRewardsAdded(
        address indexed gamer,
        uint256 experienceGained,
        uint256 tokensRewarded
    );
    event ChoiceMade(uint256 indexed sessionId, string winningDirection);


    modifier onlyGamer() {
        require(Gamers[msg.sender].isActive, "Not an active gamer");
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
    mapping(string => uint256) votes; // Nombre de votes pour chaque direction
    string[] winningDirections; // Directions gagnantes des cycles de vote
    mapping(address => string[]) playerChoices; // Les choix de chaque joueur pour les cycles de vote
}


    // Structure de données pour représenter un jeu proposé
    struct GameProposal {
        uint256 id;
        string name;
        uint256 voteCount;
        bool isPartnerGame; // Indique si le jeu vient d'un éditeur
    }

    // Structure pour représenter un utilisateur et son engagement
    struct Gamer {
        uint256 stakeAmount; // Montant du token staké
        uint256 experienceLevel; // Niveau d'expérience
        bool isActive; // indique si le joueur est actif dans une session
        uint256 currentSessionId; // ID de la session de jeu actuelle
    }

    // Structure pour représenter un éditeur de jeu
    struct Partner {
        string name;
        address wallet;
    }

    // Initialiser le contrat avec des paramètres de base
    constructor(address _tokenAddress) Ownable(msg.sender) {
        // Initialisation si nécessaire
        jetonTokenContract = IJetonToken(_tokenAddress);
        // gameProposals.push(GameProposal(1, "Jeu 1", 0, false));
        // gameProposals.push(GameProposal(2, "Jeu 2", 0, true)); // Proposé par un éditeur
    }

    //////////////////////////////////////////// PROPOSAL /////////////////////////////////////////////////////////////////////////////
    // Proposer un nouveau jeu par la communauté
    function proposeGame(string memory _gameName) public onlyGamer {
        gameProposals[nextGameId] = GameProposal(
            nextGameId,
            _gameName,
            0,
            false
        );
        nextGameId++;
    }

    // Voter pour un jeu
    function voteForGame(uint256 _gameId) public onlyGamer {
        // Logique de vote
    }

    // Ajouter un jeu proposé par un éditeur (réservé au propriétaire)
    function addPartnerGame(
        string memory _name,
        string memory _partnerName,
        address _partnerAddress
    ) public onlyOwner {
        partners[nextGameId] = Partner(_partnerName, _partnerAddress);
        gameProposals[nextGameId] = GameProposal(nextGameId, _name, 0, true);
        partnerGameIds.push(nextGameId);
        nextGameId++;
    }

    // Getter pour récupérer les jeux proposés par la communauté
    function getCommunityGameProposals()
        public
        view
        returns (GameProposal[] memory)
    {}

    // Getter pour récupérer les jeux proposés par les éditeurs
    function getpartnerGameProposals()
        public
        view
        returns (GameProposal[] memory)
    {
        // Voir la version précédente pour le code complet
    }

    /*
    // Fonction pour obtenir toutes les propositions de jeux
    function getAllGameProposals() public view 
    returns (
        uint256[] memory ids, 
        string[] memory names, 
        uint256[] memory voteCounts, 
        bool[] memory isPublisherGames
    ) {
        uint256 totalGames = gameProposals.length;
        ids = new uint256[](totalGames);
        names = new string[](totalGames);
        voteCounts = new uint256[](totalGames);
        isPublisherGames = new bool[](totalGames);

        for (uint256 i = 0; i < totalGames; i++) {
            ids[i] = gameProposals[i].id;
            names[i] = gameProposals[i].name;
            voteCounts[i] = gameProposals[i].voteCount;
            isPublisherGames[i] = gameProposals[i].isPublisherGame;
        }
        return (ids, names, voteCounts, isPublisherGames);
    }
}
*/

    // Fonctions pour la gestion des utilisateurs et des récompenses

    ///////////////////////////////////////////////////////////////////////////////////////// GAMING //////////////////////////////////////////////////////////////////////////////

    // Fonction pour démarrer une nouvelle session de jeu avec un jeu spécifique
    function startGameSession(uint256 gameId) public onlyOwner {
        require(
            currentSessionId == 0 || !gameSessions[currentSessionId].isActive,
            "Une session est deja active."
        );
        currentSessionId++; // Incrémenter l'ID pour une nouvelle session

        // S'assurer que le jeu spécifié existe et est valide
        require(gameProposals[gameId].id != 0, "Le jeu n'existe pas.");

        GameSession storage session = gameSessions[currentSessionId];
        session.id = currentSessionId;
        session.isActive = true;
        session.gameId = gameId; // Stocker l'ID du jeu dans la session
    }

    // Fonction pour terminer une session de jeu spécifique
    function endGameSession(uint256 _sessionId) public onlyOwner {
        require(gameSessions[_sessionId].isActive, "Session not active");
        gameSessions[_sessionId].isActive = false;

        // Calculer et attribuer les récompenses en fonction des choix corrects
        for (uint256 i = 0; i < listOfGamers.length; i++) {
            address gamerAddress = listOfGamers[i];
            uint256 correctVotes = countCorrectVotes(_sessionId, gamerAddress);
            uint256 totalVotes = gameSessions[_sessionId]
                .playerChoices[gamerAddress]
                .length;
            uint256 percentageCorrect = (correctVotes * 100) / totalVotes;

            // Calculer l'expérience gagnée en fonction du pourcentage de choix corrects
            uint256 experienceGained = calculateExperienceGained(
                percentageCorrect
            );

            // Ajouter l'expérience au joueur
            addExperience(gamerAddress, experienceGained);

            // Utiliser une fonction existante pour calculer les récompenses basées sur le nouvel niveau d'expérience
            uint256 rewardAmount = calculateRewardBasedOnExp(
                experience[gamerAddress]
            );

            // Distribuer les tokens de récompense
            jetonTokenContract.mint(gamerAddress, rewardAmount);

            // Émettre un événement pour chaque joueur récompensé
            emit ExperienceAndRewardsAdded(
                gamerAddress,
                experienceGained,
                rewardAmount
            );
        }

        // Émettre un événement pour signaler la fin de la session
        emit GameSessionEnded(_sessionId);
    }

function countCorrectVotes(uint256 _sessionId, address _gamer) private view returns (uint256) {
    uint256 correctVotes = 0;
    GameSession storage session = gameSessions[_sessionId];

    
    // On parcourt chaque vote du joueur
    for (uint i = 0; i < session.playerChoices[_gamer].length; i++) {
        string memory playerChoice = session.playerChoices[_gamer][i];
        // On vérifie si le choix du joueur correspond à l'une des directions gagnantes
        for(uint j = 0; j < session.winningDirections.length; j++) {
            if (keccak256(bytes(playerChoice)) == keccak256(bytes(session.winningDirections[j]))) {
                correctVotes++;
                break; // Arrête la recherche dès qu'une correspondance est trouvée pour ce vote
            }
        }
    }
    return correctVotes;
}

    // Fonction pour calculer l'expérience gagnée en fonction du pourcentage de réponses correctes
    function calculateExperienceGained(
        uint256 percentageCorrect
    ) private pure returns (uint256) {
        // Exemple : 10 d'expérience pour chaque tranche de 25% de réponses correctes
        return (percentageCorrect / 25) * 10;
    }

    function resetSessionVotes(uint256 _sessionId) private {
        GameSession storage session = gameSessions[_sessionId];
        // Réinitialiser les votes pour chaque direction
        session.votes["haut"] = 0;
        session.votes["bas"] = 0;
        session.votes["gauche"] = 0;
        session.votes["droite"] = 0;

        // Réinitialiser les choix des joueurs
        address[] memory gamers = session.gamerInSession; // Assurez-vous d'avoir cette liste ou une structure similaire
        for (uint256 i = 0; i < gamers.length; i++) {
            delete session.playerChoices[gamers[i]];
        }

        // Réinitialiser la liste des directions gagnantes si nécessaire
        delete session.winningDirections;
    }
    ////////////////////////////////// GAMER /////////////////////////////////
    // Fonction pour participer à une partie (utilisation de token)
    function participateInGame(uint256 sessionId) public {
        require(
            gameSessions[sessionId].isActive,
            "This session is not active."
        );
        Gamer storage gamer = Gamers[msg.sender];
        require(
            !gamer.isActive ||
                (gamer.isActive && gamer.currentSessionId != sessionId),
            "Already participating in an active session."
        );

        uint256 stakeAmount = 1 * 10 ** 18; // 1 jeton, en supposant que votre jeton suit la même précision que l'Ether (18 décimales)
        // Exiger que le joueur stake 1 jeton
        jetonTokenContract.stake(stakeAmount);
        // Mettre à jour le joueur pour qu'il soit actif dans la nouvelle session
        gamer.isActive = true;
        gamer.currentSessionId = sessionId; // Associer le joueur à la nouvelle session de jeu
        gamer.stakeAmount += stakeAmount; // Ajouter le montant misé à l'enregistrement du joueur

        emit GamerJoinedSession(msg.sender, sessionId);
    }

    function vote(uint256 _sessionId, string memory _direction) public {
        require(gameSessions[_sessionId].isActive, "Session not active");

        gameSessions[_sessionId].playerChoices[msg.sender].push(_direction);
        gameSessions[_sessionId].votes[_direction]++;
    }

function calculateWinningDirection(uint256 _sessionId) private view returns (string memory) {
    GameSession storage session = gameSessions[_sessionId];
    uint256 highestVoteCount = 0;
    string memory winningDirection = "";

    // Parcourir les directions possibles et compter les votes
    string[4] memory directions = ["haut", "bas", "gauche", "droite"];
    for (uint i = 0; i < directions.length; i++) {
        string memory direction = directions[i];
        uint256 votesForDirection = session.votes[direction];
        if (votesForDirection > highestVoteCount) {
            highestVoteCount = votesForDirection;
            winningDirection = direction;
        }
    }

    return winningDirection;
}

    function closeVotingCycle(uint256 _sessionId) public onlyOwner {
        require(gameSessions[_sessionId].isActive, "Session not active.");

        // Déterminer la direction gagnante
        string memory winningDirection = calculateWinningDirection(_sessionId);
        gameSessions[_sessionId].winningDirections.push(winningDirection);

        emit ChoiceMade(_sessionId, winningDirection);
    }

    /////// EXP , REWARD and RANK /////
    function addExperience(address gamer, uint256 expAmount) public onlyOwner {
        experience[gamer] += expAmount;
    }

    function calculateRank(uint256 exp) public pure returns (string memory) {
        if (exp >= 5000) return "Diamant";
        if (exp >= 4000) return "Platine";
        if (exp >= 3000) return "Or";
        if (exp >= 2000) return "Argent";
        if (exp >= 1000) return "Bronze";
        return "Pas de rang";
    }

    // Distribuer les récompenses en token
    function distributeTokenRewards() public onlyOwner {
        for (uint256 i = 0; i < listOfGamers.length; i++) {
            address gamerAddress = listOfGamers[i];
            Gamer storage gamer = Gamers[gamerAddress];
            uint256 experienceLevel = gamer.experienceLevel;
            uint256 rewardAmount = calculateRewardBasedOnExp(experienceLevel);

            // Appeler le contrat JETON pour transférer les tokens
            jetonTokenContract.mint(gamerAddress, rewardAmount);
        }
    }

    function calculateRewardBasedOnExp(
        uint256 exp
    ) private pure returns (uint256) {
        string memory rank = calculateRank(exp);

        // Logique pour déterminer la récompense basée sur le rang
        if (
            keccak256(abi.encodePacked(rank)) ==
            keccak256(abi.encodePacked("Diamant"))
        ) return 500; // Exemple de récompense pour le rang Diamant
        if (
            keccak256(abi.encodePacked(rank)) ==
            keccak256(abi.encodePacked("Platine"))
        ) return 400;
        if (
            keccak256(abi.encodePacked(rank)) ==
            keccak256(abi.encodePacked("Or"))
        ) return 300;
        if (
            keccak256(abi.encodePacked(rank)) ==
            keccak256(abi.encodePacked("Argent"))
        ) return 200;
        if (
            keccak256(abi.encodePacked(rank)) ==
            keccak256(abi.encodePacked("Bronze"))
        ) return 100;
        return 0; // Pas de récompense si pas de rang
    }

    // Fonction pour ajouter de l'expérience et attribuer des récompenses en tokens basées sur le pourcentage de réponses correctes
    function addExperienceAndRewards(
        address gamerAddress,
        uint256 percentageCorrect
    ) internal {
        // Déterminer l'expérience gagnée en fonction du pourcentage de réponses correctes
        uint256 experienceGained = calculateExperienceGained(percentageCorrect);
        // Ajouter l'expérience au joueur
        experience[gamerAddress] += experienceGained;

        // Déterminer le nouveau rang basé sur l'expérience totale et attribuer des tokens récompensés
        uint256 rewardAmount = calculateRewardBasedOnExp(
            experience[gamerAddress]
        );

        // Appeler le contrat JETON pour transférer les tokens
        jetonTokenContract.mint(gamerAddress, rewardAmount);

        // Émettre un événement pour indiquer l'ajout d'expérience et de récompenses
        emit ExperienceAndRewardsAdded(
            gamerAddress,
            experienceGained,
            rewardAmount
        );
    }
    function banGamer(address _address) public onlyOwner {
        delete Gamers[_address];
    }

    // Fonctions supplémentaires selon les besoins, comme l'amélioration du niveau d'expérience

    // le calcul des votes, la distribution des récompenses, etc.
}
