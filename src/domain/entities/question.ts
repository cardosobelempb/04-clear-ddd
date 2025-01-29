import { randomUUID } from 'crypto'

import { QuestionRequest } from '../../application/request/question.request'
import { Slug } from '../../shared/domain/entities/value-objects/slug'

export class Question {
  id: string
  title: string
  content: string
  slug: Slug
  authorId: string

  constructor(props: QuestionRequest.Question, id?: string) {
    this.id = id ?? randomUUID()
    this.title = props.title
    this.content = props.content
    this.slug = props.slug
    this.authorId = props.authorId
  }
}
