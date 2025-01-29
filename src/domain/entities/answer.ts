import { randomUUID } from 'crypto'
import { AnswerRequest } from '../../application/request/answer.request'

export class Answer {
  id: string
  content: string
  authorId: string
  questionId: string

  constructor(props: AnswerRequest.Answer, id?: string) {
    this.id = id ?? randomUUID()
    this.content = props.content
    this.authorId = props.authorId
    this.questionId = props.questionId
  }
}
