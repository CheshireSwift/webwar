import { Game } from '../shared/Game'

var waitingGames: Game[] =[
	{name : "Preset Game"}
]

export function getWaitingGames(): Game[] {
	return waitingGames
}

export function addGame(name: string): number {
	var nextId = waitingGames.length
	waitingGames.push({
		name: name
	})
	return nextId
}