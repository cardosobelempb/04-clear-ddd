import { AnswerEntity } from '../../../entities/answer.entity'
import { AnswerRepository } from '../answer.repository'

export class AnswerInMemoryRepository implements AnswerRepository {
  async create(answer: AnswerEntity): Promise<void> {}
}
