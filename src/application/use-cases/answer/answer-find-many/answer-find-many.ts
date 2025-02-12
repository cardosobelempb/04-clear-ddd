import { AnswerEntity } from '@/enterprise/entities/answer/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { Either, right } from '@/shared/handle-erros/either'

namespace Props {
  export interface Request {
    page: number
  }

  export type Response = Either<
    null,
    {
      answers: AnswerEntity[]
    }
  >
}

export class AnswerFindMany {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({ page }: Props.Request): Promise<Props.Response> {
    const answers = await this.answerRepository.findMany({ page })

    return right({ answers })
  }
}
