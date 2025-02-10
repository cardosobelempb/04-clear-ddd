import { AnswerCommentEntity } from '@/enterprise/entities/answer-comment.entity'
import { AnswerCommentRepository } from '@/enterprise/repositories/answer/answer-comment.repository'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace AnswerCommentCreate {
  export interface Request {
    authorId: string
    answerId: string
    content: string
  }

  export type Response = Either<
    ResourceNotFoundErro,
    {
      answerComment: AnswerCommentEntity
    }
  >
}

export class AnswerCommentCreate {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly answerCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: AnswerCommentCreate.Request): Promise<AnswerCommentCreate.Response> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundErro())
    }

    const answerComment = AnswerCommentEntity.create({
      authorId: new UniqueEntityUUID(authorId),
      answerId: new UniqueEntityUUID(answerId),
      content,
    })

    await this.answerCommentRepository.create(answerComment)
    return right({ answerComment })
  }
}
