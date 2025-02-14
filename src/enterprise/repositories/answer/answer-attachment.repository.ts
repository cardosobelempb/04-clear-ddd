import { AnswerAttachmentEntity } from '@/enterprise/entities/answer/answer-attachment.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class AnswerAttachmentRepository extends RepositoryAbstract<AnswerAttachmentEntity> {
  abstract answerAttachmentByAnswerId(
    answerId: string,
  ): Promise<AnswerAttachmentEntity[]>

  abstract deleteManyByEntityId(id: string): Promise<void>
}
