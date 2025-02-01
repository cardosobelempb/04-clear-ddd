import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'

export namespace AnswerDelete {
  export interface Request {
    authorId: string
    answerId: string
  }

  export interface Response {}
}

export class AnswerDelete {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: AnswerDelete.Request): Promise<AnswerDelete.Response> {
    const answer = await this.answerRepository.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found.')
    }
    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not alowed')
    }
    await this.answerRepository.delete(answer)
    return {}
  }
}
