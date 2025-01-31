import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace Question {
  export interface Request {
    authorId: string
    title: string
    content: string
  }

  export interface Response {
    question: QuestionEntity
  }
}

export class QuestionCreate {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: Question.Request): Promise<Question.Response> {
    const { question } = QuestionEntity.create({
      authorId: new UniqueEntityUUID(authorId),
      title,
      content,
    })

    await this.questionRepository.create(question)
    return { question }
  }
}
