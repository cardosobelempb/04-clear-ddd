import { QuestionAttachmentListEntity } from '@/enterprise/entities/question/question-attachment-list.entity'
import { QuestionAttachmentEntity } from '@/enterprise/entities/question/question-attachment.entity'
import { QuestionEntity } from '@/enterprise/entities/question/question.entity'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, right } from '@/shared/handle-erros/either'

export namespace QuestionCreate {
  export interface Request {
    authorId: string
    title: string
    content: string
    attachmentsIds: string[]
  }

  export type Response = Either<
    null,
    {
      question: QuestionEntity
    }
  >
}

export class QuestionCreate {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: QuestionCreate.Request): Promise<QuestionCreate.Response> {
    const question = QuestionEntity.create({
      authorId: new UniqueEntityUUID(authorId),
      title,
      content,
    })

    const questionAttachment = attachmentsIds.map((id) => {
      return QuestionAttachmentEntity.create({
        attachmentId: new UniqueEntityUUID(id),
        questionId: question.id,
      })
    })

    question.attachments = new QuestionAttachmentListEntity(questionAttachment)

    await this.questionRepository.create(question)
    return right({ question })
  }
}
