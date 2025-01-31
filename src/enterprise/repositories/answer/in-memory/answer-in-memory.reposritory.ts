import { AnswerEntity } from '@/enterprise/entities/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'

export class AnswerInMemoryRepository implements AnswerRepository {
  public items: AnswerEntity[] = []
  async create(entity: AnswerEntity): Promise<void> {
    this.items.push(entity)
  }
}
