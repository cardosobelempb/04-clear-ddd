import { QuestionEntity } from '@/enterprise/entities/question.entity'

import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'

export class QuestionInMemoryRepository implements QuestionRepository {
  public items: QuestionEntity[] = []

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
}
