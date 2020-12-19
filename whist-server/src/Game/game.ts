
import createBoard from './board';
import { CardSuits, PlayerCard, PlayingUser } from './types';
import playerCommunicator from './gamePlayerCommunicator';

const game = (users: PlayingUser[], strongSuit: CardSuits): any => {
    const board = createBoard(users, strongSuit);
    const playersPoints = users.reduce((accumulator, user) => {
        return accumulator[user.id] = 0;
    }, {});

    const playerPlayed = (card: PlayerCard): void => {
        board.playCard(card);

        playerCommunicator.cardPlayed(users, card);

        if (board.isBoardFull) {
            completeRound();
            return;
        }

        const userSeatNumber = users.findIndex(user => user.id == card.id);
        const nextUser = users[(userSeatNumber + 1) % users.length];

        playerCommunicator.requestCard(nextUser);
    };

    const completeRound = (): void => {
        const winnerUserInfo = board.getRoundWinner();
        const boardState = board.getBoardState();
        playerCommunicator.roundWon(users, winnerUserInfo, boardState);
        playersPoints[winnerUserInfo.id]++;
        board.resetBoard();
        const winnerUser = users.find(user => user.id === winnerUserInfo.id);
        playerCommunicator.requestCard(winnerUser);
    }

    return {

    };
};

export default game
