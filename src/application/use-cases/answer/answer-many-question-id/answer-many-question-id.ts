import { AnswerEntity } from '@/enterprise/entities/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'

export namespace AnswerManyQuestionId {
  export interface Request {
    questionId: string
    page: number
  }

  export interface Response {
    answers: AnswerEntity[]
  }
}

export class AnswerManyQuestionId {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    questionId,
    page,
  }: AnswerManyQuestionId.Request): Promise<AnswerManyQuestionId.Response> {
    const answers = await this.answerRepository.answerManyQuestionId(
      questionId,
      { page },
    )

    return { answers }
  }
}
