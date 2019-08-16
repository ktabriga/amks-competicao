import * as R from 'ramda'
import competicao from './competicaoHoje'
import moment from 'moment'

const isPar = x => x % 2 == 0

//const players = [
//  {id: 1, name: 'Maicon'},
//  {id: 2, name: 'Lucas'},
//  {id: 3, name: 'Jhonatan'},
//  {id: 4, name: 'Paulo'},
//  {id: 5, name: 'Pedro'},
//  {id: 6, name: 'João'},
//  {id: 7, name: 'Renan'},
//  {id: 8, name: 'Jorge'},
//  {id: 9, name: 'Jorge2'},
//  {id: 10, name: 'Jorge34'}
//]
const players = competicao.map((nome, index) => ({
  id: index,
  name: nome
}))

const makeSide = side => {
  if (!side) return
  if (side._isGame) {
    return {
      name: null,
      score: null,
      sourceGame: side
    }
  }
  return {
    id: side.id,
    name: side.name,
    score: null
  }
}

let id = 1
const createGames = (prefix, sides) => {
  const getGame = (first, second) => ({
    id,
    _isGame: true,
    date: moment().format(),
    name: `${prefix}${id}`,
    sides: {
      first: makeSide(first),
      second: makeSide(second)
    }
  })
  const games = []
  for (let i = 0; i < sides.length; i=i+2) {
    const first = sides[i]
    const second = sides[i+1]
    games.push(getGame(first, second))
    id++
  }
  return games
}

const createGamesRecursive = (prefix, sides) => {
  const games = createGames(prefix, sides)
  if (games.length === 1) return games[0]
  return createGamesRecursive(prefix, games)
}

const generateBracketInfo = (players) => {
  const pows2 = [2,4,8,16,32,64,128,256]
  const numGames = players.length -1
  const pow = R.find(x => x >= players.length, pows2)
  const exempted = pow - players.length
  const firstRoundCount = players.length - exempted
  return {
    numGames,
    exempted,
    firstRoundCount
  }
}

const makeGameListWithExempted = (exempted, fisrtGames, players) => {
  let gameList
  const exemptedPlayers = R.takeLast(exempted, players)
  if (exempted > 0 && isPar(exempted)) {
    return [
      ...R.take(exempted / 2, exemptedPlayers),
      ...fisrtGames,
      ...R.takeLast(exempted / 2, exemptedPlayers)
    ]
  } else {
    return [
      ...R.take(Math.ceil(exempted / 2) -1, exemptedPlayers),
      ...fisrtGames,
      ...R.takeLast(Math.ceil(exempted / 2), exemptedPlayers)
    ]
  }
}

const createBracket = (players, prefix='G') => {
  if (!players.length) return {}
  const {firstRoundCount, exempted} = generateBracketInfo(players)
  const firstRoundPlayers = R.take(firstRoundCount, players)
  const fisrtGames = createGames(prefix, firstRoundPlayers)
  const gameList = makeGameListWithExempted(exempted, fisrtGames, players)
  return createGamesRecursive(prefix, gameList)
}

const toTournamentBrackeShape = (shape) => {
  return {
    id: shape.id,
    name: shape.name,
    scheduled: shape.date,
    sides: {
      home: {
        team: {
          id: shape.sides.first.id,
          name: shape.sides.first.name,
        },
        score: {score: shape.sides.first.score},
        seed: {
          rank: 1,
          displayName: '',
          sourceGame: shape.sides.first.sourceGame && toTournamentBrackeShape(shape.sides.first.sourceGame) || null
        }
      },
      visitor: {
        team: {
          id: shape.sides.second.id,
          name: shape.sides.second.name,
        },
        score: {score: shape.sides.second.score},
        seed: {
          rank: 1,
          displayName: '',
          sourceGame: shape.sides.second.sourceGame && toTournamentBrackeShape(shape.sides.second.sourceGame) || null
        }
      }
    }
  }
}

//toTournamentBrackeShape(competicaoShape)

const changeScore = (game, playerId, score) => {
  if (game.sides.first.id === playerId) {
    game.sides.first.score = score
    console.log(game)
    return
  }
  if (game.sides.second.id === playerId) {
    game.sides.second.score = score
    console.log(game)
    return
  }
  if (game.sides.first.sourceGame) {
    changeScore(game.sides.first.sourceGame, playerId, score)
  }
  if (game.sides.second.sourceGame) {
    changeScore(game.sides.second.sourceGame, playerId, score)
  }
}

const bracket = createBracket(players)
changeScore(bracket, 3, 8)
console.log(bracket)
export const result = toTournamentBrackeShape(bracket)

