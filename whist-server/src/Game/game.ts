
import createBoard from './board';
import { CardSuits, PlayerCard, PlayingUser } from './types';

const game = (users: PlayingUser[], strongSuit: CardSuits): any => {
    const board = createBoard(users, strongSuit);


    return {

    };
};

export default game
