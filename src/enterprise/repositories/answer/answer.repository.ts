import { AnswerEntity } from '@/enterprise/entities/answer.entity'

export abstract class AnswerRepository {
  abstract findById(id: string): Promise<AnswerEntity | null>
  abstract create(entity: AnswerEntity): Promise<void>
  abstract update(entity: AnswerEntity): Promise<void>
  abstract delete(entity: AnswerEntity): Promise<void>
}
