import { AnswerEntity } from '@/enterprise/entities/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, right } from '@/shared/handle-erros/either'

export namespace AnswerQuestion {
  export interface Request {
    authorId: string
    questionId: string
    content: string
  }

  export type Response = Either<null, { answer: AnswerEntity }>
}

export class AnswerQuestion {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    questionId,
    content,
  }: AnswerQuestion.Request): Promise<AnswerQuestion.Response> {
    const answer = AnswerEntity.create({
      content,
      authorId: new UniqueEntityUUID(authorId),
      questionId: new UniqueEntityUUID(questionId),
    })

    await this.answerRepository.create(answer)
    return right({ answer })
  }
}
