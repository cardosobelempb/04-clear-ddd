import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'

export namespace Question {
  export interface Request {
    slug: string
  }

  export interface Response {
    question: QuestionEntity
  }
}

export class QuestionBySlug {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({ slug }: Question.Request): Promise<Question.Response> {
    const question = await this.questionRepository.findBySlug(slug)
    if (!question) {
      throw new Error('Question not found.')
    }
    return { question }
  }
}
