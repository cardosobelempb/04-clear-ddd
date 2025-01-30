import { QuestionEntity } from '@/enterprise/entities/question.entity'

import { QuestionRepository } from '../question.repository'

export class QuestionInMemoryRepository implements QuestionRepository {
  async create(question: QuestionEntity): Promise<QuestionEntity> {}
}
