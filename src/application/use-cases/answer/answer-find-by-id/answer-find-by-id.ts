import { AnswerEntity } from '@/enterprise/entities/answer/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace AnswerById {
  export interface Request {
    answerId: string
  }

  export type Response = Either<ResourceNotFoundErro, { answer: AnswerEntity }>
}

export class AnswerById {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    answerId,
  }: AnswerById.Request): Promise<AnswerById.Response> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundErro())
    }
    return right({ answer })
  }
}
