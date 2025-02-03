import { AnswerEntity } from '@/enterprise/entities/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'

namespace Props {
  export interface Request {
    questioId: string
    page: number
  }

  export interface Response {
    answers: AnswerEntity[]
  }
}

export class AnswerFindManyQuestionId {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({ questioId, page }: Props.Request): Promise<Props.Response> {
    const answers = await this.answerRepository.findManyQuestionId(questioId, {
      page,
    })

    return { answers }
  }
}
