import React, { Component } from 'react';
import logo from './logo.svg';
import jsog from 'jsog'
import './App.css';
import { Bracket, BracketGame, BracketGenerator } from 'react-tournament-bracket';
import gameData from './GameData'
import * as R from 'ramda'
import {result} from './lib'




const games = jsog.decode(gameData)
const root = R.find(R.propEq('id', '35b0745d-ef13-4255-8c40-c9daa95e4cc4'), games)
console.log(root)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Bracket game={result} />
      </div>
    );
  }
}

//<BracketGenerator GameComponent={BracketGame} games={gameData} homeOnTop={false} />
export default App;
