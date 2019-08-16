import React from 'react'
import { Bracket } from 'react-tournament-bracket';
import {createBracket, toTournamentBrackeShape} from './lib'

export default function Chave({atletas=[]}) {
  return (
    <Bracket game={toTournamentBrackeShape(createBracket(atletas))} />
  )
}
