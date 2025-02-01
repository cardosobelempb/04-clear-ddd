import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'

export namespace QuestionById {
  export interface Request {
    questionId: string
  }

  export interface Response {
    question: QuestionEntity
  }
}

export class QuestionById {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    questionId,
  }: QuestionById.Request): Promise<QuestionById.Response> {
    const question = await this.questionRepository.findById(questionId)
    if (!question) {
      throw new Error('Question not found.')
    }
    return { question }
  }
}
