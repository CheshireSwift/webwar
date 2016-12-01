export interface Game  {
	name: string
	id: number
	state: GameState

	numberOfPlayers: number
}

export enum GameState {
	WAITING,
	IN_PROGRESS,
	FINISHED
}