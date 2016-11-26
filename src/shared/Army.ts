import { Storable } from './Storable'
import { Unit } from './Unit'

export class Army implements Storable {
  public readonly units: Unit[]
  public readonly colourId: number

  public constructor(json: string) {
    var parsed: any = JSON.parse(json)
    this.colourId = parsed.colourId
    this.units = parsed.units
  }

  public toJSON(): string {
    return JSON.stringify(this)
  }

  public addUnit(unit:Unit) {
    this.units.push(unit)
  }

//qqtas: how to put various Unit subclasses in here?
// Do we have to look up typeId then parse them accordingly?
  public static test():Army {
    var testUnitA: Unit = Storable.fromJSON(
      Unit,
      '{ "typeId": 0, "health": 10, "xPos": 1, "yPos":2 }'
    )
    var testUnitB: Unit = Storable.fromJSON(
      Unit,
      '{ "typeId": 0, "health": 10, "xPos": 2, "yPos":3 }'
    )

    var testArmy: Army = Storable.fromJSON(
      Army,
      '{ "colourId": 0, "units": [] }'
    )
    testArmy.addUnit(testUnitA)
    testArmy.addUnit(testUnitB)
    console.log(testArmy)
    return testArmy
  }
}
