import { Storable } from './Storable'

export class Unit implements Storable {
  public readonly typeId: number
  public readonly teamId: number
  public readonly health: number
  public readonly xPos: number
  public readonly yPos: number

  public constructor(json: string) {
    var parsed: any = JSON.parse(json)
    this.typeId = parsed.typeId
    this.teamId = parsed.teamId
    this.health = parsed.health
    this.xPos = parsed.xPos
    this.yPos = pared.yPos
  }

  public toJSON(): string {
    return JSON.stringify(this)
  }

  public static test() {
    var testvar: Unit = Storable.fromJSON(
      Unit,
      '{ "typeId": 1, "teamId": 0, "health": 10, "xPos": 1, "yPos":1 }'
    )
    console.log(testvar)
  }
}
