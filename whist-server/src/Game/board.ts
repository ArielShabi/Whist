import { CardSuits, PlayerCard, PlayingUser } from './types';
import { UserInfo } from '../types';

const createBoard = (users: PlayingUser[], strongSuit: CardSuits) => {
    const cards: PlayerCard[] = [];

    const playCard = (card: PlayerCard): void => {
        const isSpaceTaken = cards.some(playerCard => playerCard.player.id === card.player.id);

        if (isSpaceTaken) {
            throw new Error(`Player all ready played card ${card}`);
        }

        cards.push(card);
    };

    const getBoardState = (): PlayerCard[] =>(
        cards
    );
    
    const resetBoard = (): void => {
        cards.splice(0, cards.length);
    };

    const isBoardFull = (): boolean => {
        return cards.length === users.length;
    };

    const getRoundWinner = (): UserInfo => {
        if (!isBoardFull()) {
            throw new Error('Cannot decide on winner if board is not full');
        }

        const winner = cards.reduce((currentWinner, playerCard) => {
            if (currentWinner.suit === playerCard.suit) {
                return playerCard.number > currentWinner.number ? playerCard : currentWinner;
            }

            return playerCard.suit === strongSuit ? playerCard : currentWinner;
        }, cards[0]);

        return winner.player;
    };

    return {
        playCard,
        getBoardState,
        resetBoard,
        isBoardFull,
        getRoundWinner
    };
};

export default createBoard;
