import { AnswerCommentEntity } from '@/enterprise/entities/answer-comment.entity'
import { AnswerCommentRepository } from '@/enterprise/repositories/answer/answer-comment.repository'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace AnswerCommentCreate {
  export interface Request {
    authorId: string
    answerId: string
    content: string
  }

  export interface Response {
    answerComment: AnswerCommentEntity
  }
}

export class AnswerCommentCreate {
  constructor(
    private readonly answerCommentRepository: AnswerCommentRepository,
    private readonly answerRepository: AnswerRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: AnswerCommentCreate.Request): Promise<AnswerCommentCreate.Response> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not foound')
    }

    const answerComment = AnswerCommentEntity.create({
      authorId: new UniqueEntityUUID(authorId),
      answerId: new UniqueEntityUUID(answerId),
      content,
    })

    await this.answerCommentRepository.create(answerComment)
    return { answerComment }
  }
}
