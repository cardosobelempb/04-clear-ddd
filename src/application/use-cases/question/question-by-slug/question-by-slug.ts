import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'

export namespace QuestionBySlug {
  export interface Request {
    slug: string
  }

  export interface Response {
    question: QuestionEntity
  }
}

export class QuestionBySlug {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    slug,
  }: QuestionBySlug.Request): Promise<QuestionBySlug.Response> {
    const question = await this.questionRepository.findBySlug(slug)
    if (!question) {
      throw new Error('Question not found.')
    }
    return { question }
  }
}
