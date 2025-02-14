import { AnswerEntity } from '@/enterprise/entities/answer/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { Either, right } from '@/shared/handle-erros/either'

export namespace AnswerManyQuestionId {
  export interface Request {
    questionId: string
    page: number
  }

  export type Response = Either<
    null,
    {
      answers: AnswerEntity[]
    }
  >
}

export class AnswerManyQuestionId {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: AnswerManyQuestionId.Request): Promise<AnswerManyQuestionId.Response> {
    const answers = await this.answerRepository.findManyAnswerId(questionId, {
      page,
    })

    return right({ answers })
  }
}
