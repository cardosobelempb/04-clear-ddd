import { QuestionEntity } from '@/enterprise/entities/question.entity'

export abstract class QuestionRepository {
  abstract create(question: QuestionEntity): Promise<QuestionEntity>
}
