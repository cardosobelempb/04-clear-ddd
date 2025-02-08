import { AnswerCommentRepository } from '@/enterprise/repositories/answer/answer-comment.repository'

export namespace AnswerCommentDelete {
  export interface Request {
    authorId: string
    answerCommentId: string
  }

  export interface Response {}
}

export class AnswerCommentDelete {
  constructor(
    private readonly answerCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: AnswerCommentDelete.Request): Promise<AnswerCommentDelete.Response> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not alowed')
    }

    await this.answerCommentRepository.delete(answerComment)
    return {}
  }
}
