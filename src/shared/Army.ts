import { Storable } from './Storable'
import { Unit } from './Unit'

export class Army implements Storable {
  public readonly units: Unit[]
  public readonly colourId: number

  public constructor(json: string) {
    var parsed: any = JSON.parse(json)
    this.colour = parsed.colour
    this.units = parsed.units
  }

  public toJSON(): string {
    return JSON.stringify(this)
  }

  public addUnit(unit:Unit) {
    this.units.push(unit)
  }

  public static test() {
    var testUnit: Unit = Storable.fromJSON(
      Unit,
      '{ "typeId": 0, "health": 10, "xPos": 1, "yPos":2 }'
    )

    var testArmy: Army = Storable.fromJSON(
      Army,
      '{ "colour": 0, "units": [] }'
    )
    testArmy.addUnit(testUnit);
    console.log(testArmy)
  }
}
