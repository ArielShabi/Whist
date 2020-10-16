import React from 'react';
import './user-hand.css';
import Card from '../Card/Card';
import { CardInfo } from '../../common/CardInfo';

const UserHand = (props) => (
    <div className="user-hand">
        <Card cardInfo={new CardInfo(5,'C')}/>
    </div>
);

export default UserHand;
