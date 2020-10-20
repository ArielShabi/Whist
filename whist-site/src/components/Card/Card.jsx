import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import CardInfo from '../../common/CardInfo';
import { cardTranslator } from '../../utils';
import './card.css';

const pathToImageFolder = '/Cards';

const Card = ({ cardInfo }) => {
    const cardString = useMemo(() => (
        cardTranslator.cardToString(cardInfo)
    ), [cardInfo]);

    const imageSrc = useMemo(() => (
        `${pathToImageFolder}/${cardString}.jpg`
    ), [cardString]);

    return (
        <div className="card">
            <img src={imageSrc} alt={cardString} />
        </div>)
};

Card.propTypes = {
    cardInfo: PropTypes.instanceOf(CardInfo)
};

export default Card;
