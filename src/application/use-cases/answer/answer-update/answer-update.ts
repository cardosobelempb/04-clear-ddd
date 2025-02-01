import { AnswerEntity } from '@/enterprise/entities/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'

export namespace AnswerUpdate {
  export interface Request {
    authorId: string
    answerId: string
    content: string
  }

  export interface Response {
    answer: AnswerEntity
  }
}

export class AnswerUpdate {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: AnswerUpdate.Request): Promise<AnswerUpdate.Response> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not alowed')
    }

    answer.content = content

    await this.answerRepository.update(answer)

    return {
      answer,
    }
  }
}
