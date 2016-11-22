import { Storable } from './Storable'

export class Game implements Storable {
	public readonly name: string

	public constructor(json: string) {
		var parsed: any = JSON.parse(json)
		this.name = parsed.name
	}

	public toJSON(): string {
		return JSON.stringify(this)
	}
}

export interface GameListModel {
	var pageTitle: string,
	var games: Game[]
}

var waitingGames: Game[] =[
	Storable.fromJSON(
		Game,
		'{"name": "waiting game"}'
	),
	Storable.fromJSON(
		Game,
		'{"name": "waiting game 2"}'
	)
]

export function getWaitingGames(): Game[] {
	return waitingGames
}