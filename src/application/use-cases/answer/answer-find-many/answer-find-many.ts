import { AnswerEntity } from '@/enterprise/entities/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'

namespace Props {
  export interface Request {
    page: number
  }

  export interface Response {
    answers: AnswerEntity[]
  }
}

export class AnswerFindMany {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({ page }: Props.Request): Promise<Props.Response> {
    const answers = await this.answerRepository.findMany({ page })

    return { answers }
  }
}
