import { Game, GameState } from '../shared/Game'

var games: Game[] = [
	{
		name : "smash wars 4 - grr",
		id: 0,
		state: GameState.IN_PROGRESS,
		numberOfPlayers: 8,
		players: [
			'HyperDave', 
			'Scoobyben!',
			'nakeddave',
			'scrubant',
			'hnm',
			'CheshireSwift',
			'fildon',
			'ryielle'],
		owner: 'nakeddave',
		currentTurn: 2
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
		owner: owner,
		currentTurn: 0
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

export function isUsersTurn(id: number, username: string) {
	var game = games[id]
	return game.players[game.currentTurn] == username
}

export function endTurn(id: number, username: string) {
	var game = games[id]
	if (game.state == GameState.IN_PROGRESS && isUsersTurn(id, username)) {
		game.currentTurn = (game.currentTurn + 1) % game.numberOfPlayers
	}
}