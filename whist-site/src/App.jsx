import React from 'react';
import { UserHand, CardsPile } from './components';
import CardInfo from './common/CardInfo';
import PlayerCard from './common/PlayerCard';
import './App.css';

function App() {
  return (
    <div className="App">
      <CardsPile cards={[
        new PlayerCard(new CardInfo(2,'D'),0),
        new PlayerCard(new CardInfo(5,'S'),3),
        new PlayerCard(new CardInfo(12,'D'),1),
        new PlayerCard(new CardInfo(11,'S'),2)
      ]} />
      <UserHand cards={[
        new CardInfo(3, 'H'),
        new CardInfo(5, 'C'),
      ]} />
    </div>
  );
}

export default App;
