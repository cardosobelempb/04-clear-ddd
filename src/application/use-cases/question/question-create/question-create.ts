import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, right } from '@/shared/handle-erros/either'

export namespace QuestionCreate {
  export interface Request {
    authorId: string
    title: string
    content: string
  }

  export type Response = Either<
    null,
    {
      question: QuestionEntity
    }
  >
}

export class QuestionCreate {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: QuestionCreate.Request): Promise<QuestionCreate.Response> {
    const question = QuestionEntity.create({
      authorId: new UniqueEntityUUID(authorId),
      title,
      content,
    })

    await this.questionRepository.create(question)
    return right({ question })
  }
}
