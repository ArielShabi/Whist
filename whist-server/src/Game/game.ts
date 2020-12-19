
import createBoard from './board';
import { CardSuits, PlayerCard, PlayingUser } from './types';
import playerCommunicator from './gamePlayerCommunicator';

const game = (users: PlayingUser[], strongSuit: CardSuits): any => {
    const board = createBoard(users, strongSuit);

    const playerPlayed = (card: PlayerCard) => {
        board.playCard(card);

        playerCommunicator.cardPlayed(users, card);

        if (board.isBoardFull) {
            const winnerUserId = board.getRoundWinner();
            //winning round logic            
        }

        const userSeatNumber = users.findIndex(user => user.id == card.id);
        const nextUser = users[(userSeatNumber + 1) % users.length];

        playerCommunicator.requestCard(nextUser);
    };    

    return {

    };
};

export default game
