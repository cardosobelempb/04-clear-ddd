import { QuestionEntity } from '@/enterprise/entities/question/question.entity'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { DomainEvents } from '@/shared/events/domain-events'

import { QuestionAttachmentInMemoryRepository } from './question-attachment-in-memory.repository'

export class QuestionInMemoryRepository implements QuestionRepository {
  public items: QuestionEntity[] = []

  constructor(private readonly questionAttachmentInmemoryRepository: QuestionAttachmentInMemoryRepository) {}

  async findById(id: string): Promise<QuestionEntity | null> {
    const question = this.items.find(item => item.id.toString() === id)
    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string): Promise<QuestionEntity | null> {
    const question = this.items.find(item => item.slug.value === slug)
    if (!question) {
      return null
    }
    return question
  }

  async findMany({ page }: Pagination.Params): Promise<QuestionEntity[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(entity: QuestionEntity): Promise<void> {
    this.items.push(entity)

    DomainEvents.dispatchEventsForAggregate(entity.id)
  }

  async update(entity: QuestionEntity): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)
    this.items[itemIndex] = entity

    DomainEvents.dispatchEventsForAggregate(entity.id)
  }

  async delete(entity: QuestionEntity): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id === entity.id)
    this.items.splice(itemIndex, 1)

    this.questionAttachmentInmemoryRepository.deleteManyByEntityId(entity.id.toString())
  }
}
