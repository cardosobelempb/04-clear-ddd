import { AnswerCommentRepository } from '@/enterprise/repositories/answer/answer-comment.repository'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace AnswerCommentDelete {
  export interface Request {
    authorId: string
    answerCommentId: string
  }

  export type Response = Either<ResourceNotFoundErro | NotAllowedErro, object>
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
      return left(new ResourceNotFoundErro())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedErro())
    }

    await this.answerCommentRepository.delete(answerComment)
    return right({})
  }
}
