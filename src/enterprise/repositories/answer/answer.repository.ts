import { AnswerEntity } from '@/enterprise/entities/answer.entity'

export abstract class AnswerRepository {
  abstract create(entity: AnswerEntity): Promise<void>
}
