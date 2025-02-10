import { AnswerEntity } from '@/enterprise/entities/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace AnswerUpdate {
  export interface Request {
    authorId: string
    answerId: string
    content: string
  }

  export type Response = Either<
    ResourceNotFoundErro | NotAllowedErro,
    {
      answer: AnswerEntity
    }
  >
}

export class AnswerUpdate {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: AnswerUpdate.Request): Promise<AnswerUpdate.Response> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundErro())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedErro())
    }

    answer.content = content

    await this.answerRepository.update(answer)

    return right({
      answer,
    })
  }
}
