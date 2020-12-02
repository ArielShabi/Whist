const board = () => {
    const cards = {};

    const playCard = (playerId, card) => {
        if (!cards[playerId]) {
            throw new Error('Card place is not empty');
        }

        cards[playerId] = card;
    }

    const clearBoard = () =>{
        
    }

}
