import React from 'react';
import PropTypes from 'prop-types';
import PlayerCard from '../../common/PlayerCard';
import './cards-pile.css'
import Card from '../Card/Card';

const CardsPile = ({ cards }) => {
    const playersCards = [];

    for (let i = 0; i < 4; i++) {
        const playerCard = cards.find(card => card.player === i);

        playersCards.push(
            <div className="cards-pile-player-card" id={`player-card-id${i}`} key={i}>
                {
                    playerCard
                        ? <Card cardInfo={playerCard.card} />
                        : null
                }
            </div>
        );
    }

    return (
        <div className="cards-pile">
            {playersCards}
        </div>
    )
};

CardsPile.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.instanceOf(PlayerCard)
    )
};

CardsPile.defaultProps = {
    cards: []
};

export default CardsPile;
