import { AnswerEntity } from '@/enterprise/entities/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'

export namespace AnswerById {
  export interface Request {
    answerId: string
  }

  export interface Response {
    answer: AnswerEntity
  }
}

export class AnswerById {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    answerId,
  }: AnswerById.Request): Promise<AnswerById.Response> {
    const answer = await this.answerRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found.')
    }
    return { answer }
  }
}
