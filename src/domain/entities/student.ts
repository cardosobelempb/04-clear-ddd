import { randomUUID } from 'crypto'

export class Student {
  id: string
  name: string
  constructor(title: string, id?: string) {
    this.id = id ?? randomUUID()
    this.name = title
  }
}
