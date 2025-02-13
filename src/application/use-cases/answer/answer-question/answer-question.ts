import { AnswerAttachmentListEntity } from '@/enterprise/entities/answer/answer-attachment-list.entity'
import { AnswerAttachmentEntity } from '@/enterprise/entities/answer/answer-attachment.entity'
import { AnswerEntity } from '@/enterprise/entities/answer/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, right } from '@/shared/handle-erros/either'

export namespace AnswerQuestion {
  export interface Request {
    authorId: string
    questionId: string
    content: string
    attachmentsIds: string[]
  }

  export type Response = Either<null, { answer: AnswerEntity }>
}

export class AnswerQuestion {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestion.Request): Promise<AnswerQuestion.Response> {
    const answer = AnswerEntity.create({
      content,
      authorId: new UniqueEntityUUID(authorId),
      questionId: new UniqueEntityUUID(questionId),
    })

    const answerAttachment = attachmentsIds.map((id) => {
      return AnswerAttachmentEntity.create({
        attachmentId: new UniqueEntityUUID(id),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentListEntity(answerAttachment)

    await this.answerRepository.create(answer)
    return right({ answer })
  }
}
