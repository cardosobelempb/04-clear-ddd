import { QuestionAttachmentEntity } from '@/enterprise/entities/question/question-attachment.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class QuestionAttachmentRepository extends RepositoryAbstract<QuestionAttachmentEntity> {
  abstract questionAttachmentByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachmentEntity[]>
}
