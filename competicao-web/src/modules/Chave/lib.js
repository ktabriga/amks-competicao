import * as R from 'ramda'
import moment from 'moment'
import uuid from 'uuid/v1'

const isPar = x => x % 2 == 0


const createSide = side => {
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

const createGame = (prefix, firstPlayer, secondPlayer) => {
  const id = uuid()
  return {
    id,
    _isGame: true,
    date: moment().format(),
    name: `${prefix}${id}`,
    sides: {
      first: createSide(firstPlayer),
      second: createSide(secondPlayer)
    }
  }
}

const createGames = (prefix, players) => {
  const games = []
  for (let i = 0; i < players.length; i=i+2) {
    const first = players[i]
    const second = players[i+1]
    games.push(createGame(prefix, first, second))
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
  const exemptedPlayers = R.takeLast(exempted, players)
  if (exempted > 0 && isPar(exempted)) {
    return [
      ...R.take(exempted / 2, exemptedPlayers),
      ...fisrtGames,
      ...R.takeLast(exempted / 2, exemptedPlayers)
    ]
  }

  return [
    ...R.take(Math.ceil(exempted / 2) -1, exemptedPlayers),
    ...fisrtGames,
    ...R.takeLast(Math.ceil(exempted / 2), exemptedPlayers)
  ]
}

//main function to generate the bracket
/*
 *
 * format
 *const players = [
 *{id: 1, name: 'Maicon'},
 *{id: 2, name: 'Lucas'},
 *{id: 3, name: 'Jhonatan'},
 *{id: 4, name: 'Paulo'},
 *{id: 5, name: 'Pedro'},
 *{id: 6, name: 'João'},
 *{id: 7, name: 'Renan'},
 *{id: 8, name: 'Jorge'},
 *{id: 9, name: 'Jorge2'},
 *{id: 10, name: 'Jorge34'}
 *]
 */
export const createBracket = (players, prefix='G') => {
  if (!players.length) return {}
  const {firstRoundCount, exempted} = generateBracketInfo(players)
  const firstRoundPlayers = R.take(firstRoundCount, players)
  const fisrtGames = createGames(prefix, firstRoundPlayers)
  const gameList = makeGameListWithExempted(exempted, fisrtGames, players)
  return createGamesRecursive(prefix, gameList)
}

export const toTournamentBrackeShape = (shape) => {
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
      visitor: shape.sides.second ? {
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
      } : {}
    }
  }
}

//toTournamentBrackeShape(competicaoShape)

//ex: changeScore(bracket, 3, 8)
export const changeScore = (game, playerId, score) => {
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


