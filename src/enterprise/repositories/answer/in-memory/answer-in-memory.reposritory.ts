import { AnswerEntity } from '@/enterprise/entities/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'

export class AnswerInMemoryRepository implements AnswerRepository {
  public items: AnswerEntity[] = []

  async findById(id: string): Promise<AnswerEntity | null> {
    const answer = this.items.find((item) => item.id.toString() === id)
    if (!answer) {
      return null
    }

    return answer
  }

  async create(entity: AnswerEntity): Promise<void> {
    this.items.push(entity)
  }

  async update(entity: AnswerEntity): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity: AnswerEntity): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === entity.id)
    this.items.splice(itemIndex, 1)
  }
}
