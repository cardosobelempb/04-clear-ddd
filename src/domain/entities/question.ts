import { randomUUID } from 'crypto'
import { QuestionRequest } from '../../application/request/question.request'

export class Question {
  id: string
  title: string
  content: string
  authorId: string

  constructor(props: QuestionRequest.Question, id?: string) {
    this.id = id ?? randomUUID()
    this.title = props.title
    this.content = props.content
    this.authorId = props.authorId
  }
}
