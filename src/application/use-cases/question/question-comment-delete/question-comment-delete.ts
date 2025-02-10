import { QuestionCommentRepository } from '@/enterprise/repositories/question/question-comment.repository'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace QuestionCommentDelete {
  export interface Request {
    authorId: string
    questionCommentId: string
  }

  export type Response = Either<ResourceNotFoundErro | NotAllowedErro, object>
}

export class QuestionCommentDelete {
  constructor(
    private readonly questionCommentRepository: QuestionCommentRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: QuestionCommentDelete.Request): Promise<QuestionCommentDelete.Response> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundErro())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedErro())
    }

    await this.questionCommentRepository.delete(questionComment)
    return right({})
  }
}
