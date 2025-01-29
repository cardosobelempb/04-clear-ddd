import { randomUUID } from 'crypto'

export class Answer {
  id: string
  content: string

  constructor(content: string, id?: string) {
    this.id = id ?? randomUUID()
    this.content = content
  }
}
