import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import CardInfo from '../../common/CardInfo';
import './user-hand.css';

const UserHand = ({ cards }) => {
    const cardsComponents =
        cards.map((card, index) => (
            <Card key={index} cardInfo={card} />
        ))


    return (
        <div className="user-hand">
            {cardsComponents}
        </div>
    )
};

UserHand.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.instanceOf(CardInfo)).isRequired
}

export default UserHand;
