import { QuestionCommentEntity } from '@/enterprise/entities/question-comment.entity'
import { QuestionCommentRepository } from '@/enterprise/repositories/question/question-comment.repository'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace QuestionCommentCreate {
  export interface Request {
    authorId: string
    questionId: string
    content: string
  }

  export interface Response {
    questionComment: QuestionCommentEntity
  }
}

export class QuestionCommentCreate {
  constructor(
    private readonly questionCommentRepository: QuestionCommentRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: QuestionCommentCreate.Request): Promise<QuestionCommentCreate.Response> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not foound')
    }

    const questionComment = QuestionCommentEntity.create({
      authorId: new UniqueEntityUUID(authorId),
      questionId: new UniqueEntityUUID(questionId),
      content,
    })

    await this.questionCommentRepository.create(questionComment)
    return { questionComment }
  }
}
