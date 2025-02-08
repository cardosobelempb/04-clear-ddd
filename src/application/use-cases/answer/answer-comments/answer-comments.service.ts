import { AnswerCommentEntity } from '@/enterprise/entities/answer-comment.entity'
import { AnswerCommentRepository } from '@/enterprise/repositories/answer/answer-comment.repository'

export namespace AnswerCommentsService {
  export interface Request {
    answerId: string
    page: number
  }

  export interface Response {
    answerComments: AnswerCommentEntity[]
  }
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

    return { answerComments }
  }
}
