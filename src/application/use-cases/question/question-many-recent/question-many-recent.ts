import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'

export namespace QuestionManyRecent {
  export interface Request {
    page: number
  }

  export interface Response {
    questions: QuestionEntity[]
  }
}

export class QuestionManyRecent {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    page,
  }: QuestionManyRecent.Request): Promise<QuestionManyRecent.Response> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return { questions }
  }
}
