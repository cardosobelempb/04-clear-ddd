import { QuestionAttachmentListEntity } from '@/enterprise/entities/question/question-attachment-list.entity'
import { QuestionAttachmentEntity } from '@/enterprise/entities/question/question-attachment.entity'
import { QuestionAttachmentRepository } from '@/enterprise/repositories/question/question-attachment-list.repository'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace QuestionUpdate {
  export interface Request {
    authorId: string
    questionId: string
    title: string
    content: string
    attachmentsIds: string[]
  }

  export type Response = Either<ResourceNotFoundErro | NotAllowedErro, object>
}

export class QuestionUpdate {
  constructor(
    private readonly questionAttachmentRespository: QuestionAttachmentRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds,
  }: QuestionUpdate.Request): Promise<QuestionUpdate.Response> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundErro())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedErro())
    }

    const currentQuestionAttachments =
      await this.questionAttachmentRespository.questionAttachmentByQuestionId(
        questionId,
      )

    const questionAttachmentList = new QuestionAttachmentListEntity(
      currentQuestionAttachments,
    )

    const questionAttachments = attachmentsIds.map((id) => {
      return QuestionAttachmentEntity.create({
        attachmentId: new UniqueEntityUUID(id),
        questionId: question.id,
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList

    await this.questionRepository.update(question)

    return right({})
  }
}
