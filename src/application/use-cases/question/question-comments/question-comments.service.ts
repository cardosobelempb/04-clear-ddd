import { QuestionCommentEntity } from '@/enterprise/entities/question/question-comment.entity'
import { QuestionCommentRepository } from '@/enterprise/repositories/question/question-comment.repository'
import { Either, right } from '@/shared/handle-erros/either'

export namespace QuestionCommentsService {
  export interface Request {
    questionId: string
    page: number
  }

  export type Response = Either<
    null,
    {
      questionComments: QuestionCommentEntity[]
    }
  >
}

export class QuestionCommentsService {
  constructor(
    private readonly questionCommentRepository: QuestionCommentRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: QuestionCommentsService.Request): Promise<QuestionCommentsService.Response> {
    const questionComments =
      await this.questionCommentRepository.questionComments(questionId, {
        page,
      })

    return right({ questionComments })
  }
}
