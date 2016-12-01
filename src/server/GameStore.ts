import { Game, GameState } from '../shared/Game'

var games: Game[] = [
	{
		name : "Preset Game",
		id: 0,
		state: GameState.WAITING,
		numberOfPlayers: 3,
		players: ['Mr Fleeps', 'Mrs Fleeps'],
		owner: 'Mr Fleeps'
	}
]

export function getGamesWithState(state: GameState): Game[] {
	return games.filter(game => game.state == state)
}

export function addGame(
	name: string, 
	numberOfPlayers: number,
	owner: string): number {
	var nextId = games.length
	games.push({
		name: name,
		id: nextId,
		state: GameState.WAITING,
		numberOfPlayers: numberOfPlayers,
		players: [owner],
		owner: owner
	})
	return nextId
}

export function getGame(id: number): Game {
	return games[id]
}

export function startGame(id: number): void {
	if (games[id].state == GameState.WAITING) {
		games[id].state = GameState.IN_PROGRESS
	}
}

export function endGame(id: number): void {
	if (games[id].state == GameState.IN_PROGRESS) {
		games[id].state = GameState.FINISHED
	}
}

export function joinGame(id: number, username: string) {
	console.log(username)
	if (canJoinGame(id, username)) {
		games[id].players.push(username)
	}
}

export function canJoinGame(id: number, username: string) {
	var game = games[id]
	return game.state == GameState.WAITING
		&& game.players.indexOf(username) < 0
		&& game.players.length < game.numberOfPlayers
}

export function canStartGame(id: number, username: string) {
	var game = games[id]
	return game.state == GameState.WAITING
		&& game.owner == username
		&& game.players.length == game.numberOfPlayers
}