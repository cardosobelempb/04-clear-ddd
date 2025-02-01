import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'

export namespace QuestionDelete {
  export interface Request {
    authorId: string
    questionId: string
  }

  export interface Response {}
}

export class QuestionDelete {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: QuestionDelete.Request): Promise<QuestionDelete.Response> {
    const question = await this.questionRepository.findById(questionId)
    if (!question) {
      throw new Error('Question not found.')
    }
    if (authorId !== question.authorId.toString()) {
      throw new Error('Not alowed')
    }
    await this.questionRepository.delete(question)
    return {}
  }
}
