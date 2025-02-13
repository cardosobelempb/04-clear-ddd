import { AnswerAttachmentEntity } from '@/enterprise/entities/answer/answer-attachment.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

import { AnswerAttachmentRepository } from '../answer-attachment.repository'

export class AnswerAttachmentInMemoryRepository
  implements AnswerAttachmentRepository
{
  public items: AnswerAttachmentEntity[] = []

  async answerAttachmentByAnswerId(
    answerId: string,
  ): Promise<AnswerAttachmentEntity[]> {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async findById(id: string): Promise<AnswerAttachmentEntity | null> {
    throw new Error('Method not implemented.')
  }

  async findMany(params: Pagination.Params): Promise<AnswerAttachmentEntity[]> {
    throw new Error('Method not implemented.')
  }

  async create(entity: AnswerAttachmentEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async update(entity: AnswerAttachmentEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(entity: AnswerAttachmentEntity): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async deleteManyByEntityId(id: string): Promise<void> {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== id,
    )

    this.items = answerAttachments
  }
}
