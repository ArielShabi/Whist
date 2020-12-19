
import createBoard from './board';
import { CardSuits, PlayerCard, PlayingUser } from './types';
import playerCommunicator from './gamePlayerCommunicator';

const game = (players: PlayingUser[], strongSuit: CardSuits): any => {
    const board = createBoard(players, strongSuit);
    const playersPoints = players.reduce((accumulator, player) => {
        return accumulator[player.id] = 0;
    }, {});

    const playerPlayed = (card: PlayerCard): void => {
        board.playCard(card);

        const currentPlayer = players.find(player => player.id === card.id);
        currentPlayer.cards = currentPlayer.cards.filter(c => c.number !== card.number && c.suit !== card.suit);

        playerCommunicator.cardPlayed(players, card);

        if (board.isBoardFull) {
            completeRound();

            if (currentPlayer.cards.length === 0) {
                //FINISH
            }
            
            return;
        }

        const playerSeatNumber = players.findIndex(player => player.id == card.id);
        const nextUser = players[(playerSeatNumber + 1) % players.length];

        playerCommunicator.requestCard(nextUser);
    };

    const completeRound = (): void => {
        const winnerInfo = board.getRoundWinner();
        const boardState = board.getBoardState();
        playerCommunicator.roundWon(players, winnerInfo, boardState);
        playersPoints[winnerInfo.id]++;
        board.resetBoard();
        const winner = players.find(player => player.id === winnerInfo.id);
        playerCommunicator.requestCard(winner);
    }

    return {

    };
};

export default game
