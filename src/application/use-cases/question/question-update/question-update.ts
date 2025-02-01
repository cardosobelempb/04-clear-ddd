import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'

export namespace QuestionUpdate {
  export interface Request {
    authorId: string
    questionId: string
    title: string
    content: string
  }

  export interface Response {}
}

export class QuestionUpdate {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: QuestionUpdate.Request): Promise<QuestionUpdate.Response> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not alowed')
    }

    question.title = title
    question.content = content

    await this.questionRepository.update(question)

    return {}
  }
}
