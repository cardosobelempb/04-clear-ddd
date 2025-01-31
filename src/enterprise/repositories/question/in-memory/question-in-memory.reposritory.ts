import { QuestionEntity } from '@/enterprise/entities/question.entity'

import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'

export class QuestionInMemoryRepository implements QuestionRepository {
  public items: QuestionEntity[] = []
  async create(entity: QuestionEntity): Promise<void> {
    this.items.push(entity)
  }
}
