import { randomUUID } from 'node:crypto'

export class UniqueEntityUUID {
  private value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }
}
