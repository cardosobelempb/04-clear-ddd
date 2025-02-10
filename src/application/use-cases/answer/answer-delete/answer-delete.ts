import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace AnswerDelete {
  export interface Request {
    authorId: string
    answerId: string
  }

  export type Response = Either<ResourceNotFoundErro | NotAllowedErro, object>
}

export class AnswerDelete {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: AnswerDelete.Request): Promise<AnswerDelete.Response> {
    const answer = await this.answerRepository.findById(answerId)
    if (!answer) {
      return left(new ResourceNotFoundErro())
    }
    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedErro())
    }
    await this.answerRepository.delete(answer)
    return right({})
  }
}
