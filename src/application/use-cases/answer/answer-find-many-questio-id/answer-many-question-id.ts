import { AnswerEntity } from '@/enterprise/entities/answer/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { Either, right } from '@/shared/handle-erros/either'

namespace Props {
  export interface Request {
    questioId: string
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

  async execute({ questioId, page }: Props.Request): Promise<Props.Response> {
    const answers = await this.answerRepository.findManyAnswerId(questioId, {
      page,
    })

    return right({ answers })
  }
}
