import { QuestionAttachmentEntity } from '@/enterprise/entities/question/question-attachment.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { QuestionAttachmentRepository } from '../question-attachment-list.repository'

export class QuestionAttachmentInMemoryRepository
  implements QuestionAttachmentRepository
{
  public items: QuestionAttachmentEntity[] = []

  async questionAttachmentByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachmentEntity[]> {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttachments
  }

  async findById(id: string): Promise<QuestionAttachmentEntity | null> {
    throw new Error('Method not implemented.')
  }

  async findMany(
    params: Pagination.Params,
  ): Promise<QuestionAttachmentEntity[]> {
    throw new Error('Method not implemented.')
  }

  async create(entity: QuestionAttachmentEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async update(entity: QuestionAttachmentEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(entity: QuestionAttachmentEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async deleteManyByEntityId(id: string): Promise<void> {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() !== id,
    )

    this.items = questionAttachments
  }
}
