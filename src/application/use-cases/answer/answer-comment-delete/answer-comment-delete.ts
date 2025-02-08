import { AnswerCommentRepository } from '@/enterprise/repositories/answer/answer-comment.repository'
import { Either, left, right } from '@/shared/either'

export namespace AnswerCommentDelete {
  export interface Request {
    authorId: string
    answerCommentId: string
  }

  export type Response = Either<string, object>
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
      return left('Answer comment not found')
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left('Not alowed')
    }

    await this.answerCommentRepository.delete(answerComment)
    return right({})
  }
}
