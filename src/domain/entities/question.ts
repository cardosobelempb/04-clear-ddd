import { randomUUID } from 'crypto'

export class Question {
  id: string
  title: string
  description: string

  constructor(title: string, description: string, id?: string) {
    this.id = id ?? randomUUID()
    this.title = title
    this.description = description
  }
}
