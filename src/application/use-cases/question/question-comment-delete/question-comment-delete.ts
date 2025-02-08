import { QuestionCommentRepository } from '@/enterprise/repositories/question/question-comment.repository'

export namespace QuestionCommentDelete {
  export interface Request {
    authorId: string
    questionCommentId: string
  }

  export interface Response {}
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
      throw new Error('QuestionComment not found.')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not alowed')
    }

    await this.questionCommentRepository.delete(questionComment)
    return {}
  }
}
