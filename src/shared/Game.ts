export interface Game  {
	name: string
	id: number
	state: GameState
}

export enum GameState {
	WAITING,
	IN_PROGRESS,
	FINISHED
}