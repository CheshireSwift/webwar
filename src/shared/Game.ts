export interface Game  {
	name: string
	id: number
	state: GameState

	numberOfPlayers: number
	players: string[]
	owner: string
}

export enum GameState {
	WAITING,
	IN_PROGRESS,
	FINISHED
}