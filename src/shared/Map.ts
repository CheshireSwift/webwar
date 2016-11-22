import { Storable } from './Storable'

export class Map implements Storable {
  public readonly name: string
  public readonly tileIds: number[][]

  public constructor(json: string) {
    var parsed: any = JSON.parse(json)
    this.name = parsed.name
    this.tileIds = parsed.tileIds
  }

  public toJSON(): string {
    return JSON.stringify(this)
  }

  public static test() {
    var testvar: Map = Storable.fromJSON(
      Map,
      '{ "name": "waffle", "tileIds": [], "irrelevant": "oops" }'
    )
    console.log(testvar)
  }
}
