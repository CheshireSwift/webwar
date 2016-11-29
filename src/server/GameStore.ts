import { Game, GameState } from '../shared/Game'

var games: Game[] = [
	{
		name : "Preset Game",
		id: 0,
		state: GameState.WAITING
	}
]

export function getGamesWithState(state: GameState): Game[] {
	return games.filter(game => game.state == state)
}

export function addGame(name: string): number {
	var nextId = games.length
	games.push({
		name: name,
		id: nextId,
		state: GameState.WAITING
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