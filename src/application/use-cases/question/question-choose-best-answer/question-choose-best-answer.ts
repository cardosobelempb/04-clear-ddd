import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'

export namespace QuestionChooseBestAnswer {
  export interface Request {
    authorId: string
    answerId: string
  }

  export interface Response {
    question: QuestionEntity
  }
}

export class QuestionChooseBestAnswer {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: QuestionChooseBestAnswer.Request): Promise<QuestionChooseBestAnswer.Response> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not foound')
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not alowed')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.update(question)

    return {
      question,
    }
  }
}
