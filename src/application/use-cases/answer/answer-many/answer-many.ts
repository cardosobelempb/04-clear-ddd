import { AnswerEntity } from '@/enterprise/entities/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'

export namespace AnswerMany {
  export interface Request {
    page: number
  }

  export interface Response {
    answers: AnswerEntity[]
  }
}

export class AnswerMany {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({ page }: AnswerMany.Request): Promise<AnswerMany.Response> {
    const answers = await this.answerRepository.findMany({ page })

    return { answers }
  }
}
