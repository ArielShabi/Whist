const royalty = {
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K'
};

const cardToString = (cardInfo) => {
    const { number, shape } = cardInfo;

    if (royalty[number]) {
        return `${royalty[number]}${shape}`;
    }

    return `${number}${shape}`;
};

export default {
    cardToString
};
