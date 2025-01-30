import { AnswerEntity } from '../../entities/answer.entity'

export abstract class AnswerRepository {
  abstract create(answer: AnswerEntity): Promise<void>
}
