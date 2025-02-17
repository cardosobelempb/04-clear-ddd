import { AnswerEntity } from '@/enterprise/entities/answer/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { DomainEvents } from '@/shared/events/domain-events'

import { AnswerAttachmentInMemoryRepository } from './answer-attachment-in-memory.repository'

export class AnswerInMemoryRepository implements AnswerRepository {
  public items: AnswerEntity[] = []

  constructor(private readonly answerAttachmentInmemoryRepository: AnswerAttachmentInMemoryRepository) {}

  async findById(id: string): Promise<AnswerEntity | null> {
    const answer = this.items.find(item => item.id.toString() === id)
    if (!answer) {
      return null
    }

    return answer
  }

  async findMany({ page }: Pagination.Params): Promise<AnswerEntity[]> {
    const answers = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async findManyAnswerId(questioId: string, { page }: Pagination.Params): Promise<AnswerEntity[]> {
    const answers = this.items
      .filter(item => item.questionId.toString() === questioId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(entity: AnswerEntity): Promise<void> {
    this.items.push(entity)
    DomainEvents.dispatchEventsForAggregate(entity.id)
  }

  async update(entity: AnswerEntity): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)

    this.items[itemIndex] = entity

    DomainEvents.dispatchEventsForAggregate(entity.id)
  }

  async delete(entity: AnswerEntity): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)
    this.items.splice(itemIndex, 1)

    this.answerAttachmentInmemoryRepository.deleteManyByEntityId(entity.id.toString())
  }
}
