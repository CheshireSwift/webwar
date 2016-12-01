export interface Game  {
	name: string
	id: number
	state: GameState

	numberOfPlayers: number
	players: string[]
	owner: string
	currentTurn: number
}

export enum GameState {
	WAITING,
	IN_PROGRESS,
	FINISHED
}