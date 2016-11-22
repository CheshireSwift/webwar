export module Storable {
  export interface StorableClass<T extends Storable> {
    new (json: string): T
  }

  export function fromJSON<T extends Storable>(Klass: StorableClass<T>, json: string): T {
    return new Klass(json)
  }
}

export interface Storable {
  toJSON(): string
}
