import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CardInfo } from '../../common/CardInfo';
import './card.css';
import { cardTranslator } from '../../utils';

const pathToImageFolder = '/Cards';

const Card = ({ cardInfo }) => {
    const imageSrc = useMemo(() => {
        const cardString = cardTranslator.cardToString(cardInfo);
        return `${pathToImageFolder}/${cardString}.jpg`;
    }, [cardInfo])

    return (
        <div className="card">
            <img src={imageSrc} />
        </div>)
};

Card.propTypes = {
    cardInfo: PropTypes.instanceOf(CardInfo)
};

export default Card;
