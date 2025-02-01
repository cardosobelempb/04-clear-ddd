import { QuestionEntity } from '@/enterprise/entities/question.entity'

import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'

export class QuestionInMemoryRepository implements QuestionRepository {
  public items: QuestionEntity[] = []

  async findById(id: string): Promise<QuestionEntity | null> {
    const question = this.items.find((item) => item.id.toString() === id)
    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string): Promise<QuestionEntity | null> {
    const question = this.items.find((item) => item.slug.value === slug)
    if (!question) {
      return null
    }
    return question
  }

  async create(entity: QuestionEntity): Promise<void> {
    this.items.push(entity)
  }

  async update(entity: QuestionEntity): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity: QuestionEntity): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === entity.id)
    this.items.splice(itemIndex, 1)
  }
}
