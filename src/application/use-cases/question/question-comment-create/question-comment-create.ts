import { QuestionCommentEntity } from '@/enterprise/entities/question-comment.entity'
import { QuestionCommentRepository } from '@/enterprise/repositories/question/question-comment.repository'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace QuestionCommentCreate {
  export interface Request {
    authorId: string
    questionId: string
    content: string
  }

  export type Response = Either<
    ResourceNotFoundErro,
    {
      questionComment: QuestionCommentEntity
    }
  >
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
      return left(new ResourceNotFoundErro())
    }

    const questionComment = QuestionCommentEntity.create({
      authorId: new UniqueEntityUUID(authorId),
      questionId: new UniqueEntityUUID(questionId),
      content,
    })

    await this.questionCommentRepository.create(questionComment)
    return right({ questionComment })
  }
}
