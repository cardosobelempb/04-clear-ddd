import { AnswerCommentEntity } from '@/enterprise/entities/answer-comment.entity'
import { AnswerCommentRepository } from '@/enterprise/repositories/answer/answer-comment.repository'
import { Either, right } from '@/shared/handle-erros/either'

export namespace AnswerCommentsService {
  export interface Request {
    answerId: string
    page: number
  }

  export type Response = Either<null, { answerComments: AnswerCommentEntity[] }>
}

export class AnswerCommentsService {
  constructor(
    private readonly answerCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    answerId,
    page,
  }: AnswerCommentsService.Request): Promise<AnswerCommentsService.Response> {
    const answerComments = await this.answerCommentRepository.answerComments(
      answerId,
      {
        page,
      },
    )

    return right({ answerComments })
  }
}
