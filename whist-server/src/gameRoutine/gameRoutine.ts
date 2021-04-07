
import createBoard from './board';
import { CardSuits, PlayerCard, PlayingUser } from './types';
import { UserInfo } from '../types';
import { GamePlayerCommunicator } from '../PlayersCommunicator/types';

const gameRoutine = (players: PlayingUser[], playerCommunicator: GamePlayerCommunicator, firstPlayer: UserInfo, strongSuit: CardSuits): any => {
    const board = createBoard(players, strongSuit);
    let nextPlayer = firstPlayer;

    const startRoutine = () => {
        playerCommunicator.requestCard(firstPlayer);
    };

    const playersPoints = players.reduce((accumulator, player) => {
        return accumulator[player.id] = 0;
    }, {});

    const playerPlayed = (card: PlayerCard): void => {
        if (nextPlayer.id !== card.player.id) {
            throw Error('Player played out of turn');
        }

        board.playCard(card);

        const currentPlayer = players.find(player => player.id === card.player.id);
        currentPlayer.cards = currentPlayer.cards.filter(c => c.number !== card.number && c.suit !== card.suit);

        playerCommunicator.cardPlayed(card);

        if (board.isBoardFull) {
            const winner = completeRound();

            if (currentPlayer.cards.length === 0) {
                //FINISH
            }

            playerCommunicator.requestCard(winner);
            return;
        }

        const playerSeatNumber = players.findIndex(player => player.id == card.player.id);
        const nextUser = players[(playerSeatNumber + 1) % players.length];

        playerCommunicator.requestCard(nextUser);
    };

    const completeRound = (): PlayingUser => {
        const winnerInfo = board.getRoundWinner();
        playerCommunicator.roundWon(winnerInfo);
        playersPoints[winnerInfo.id]++;
        board.resetBoard();
        return players.find(player => player.id === winnerInfo.id);
    }

    return {
        startRoutine,
        playerPlayed
    };
};

export default gameRoutine
