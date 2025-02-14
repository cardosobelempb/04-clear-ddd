import { AnswerAttachmentListEntity } from '@/enterprise/entities/answer/answer-attachment-list.entity'
import { AnswerAttachmentEntity } from '@/enterprise/entities/answer/answer-attachment.entity'
import { AnswerEntity } from '@/enterprise/entities/answer/answer.entity'
import { AnswerAttachmentRepository } from '@/enterprise/repositories/answer/answer-attachment.repository'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace AnswerUpdate {
  export interface Request {
    authorId: string
    answerId: string
    content: string
    attachmentsIds: string[]
  }

  export type Response = Either<
    ResourceNotFoundErro | NotAllowedErro,
    {
      answer: AnswerEntity
    }
  >
}

export class AnswerUpdate {
  constructor(
    private readonly answerAttachmentRespository: AnswerAttachmentRepository,
    private readonly answerRepository: AnswerRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: AnswerUpdate.Request): Promise<AnswerUpdate.Response> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundErro())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedErro())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentRespository.answerAttachmentByAnswerId(
        answerId,
      )

    const answerAttachmentList = new AnswerAttachmentListEntity(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((id) => {
      return AnswerAttachmentEntity.create({
        attachmentId: new UniqueEntityUUID(id),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.attachments = answerAttachmentList
    answer.content = content

    await this.answerRepository.update(answer)

    return right({
      answer,
    })
  }
}
