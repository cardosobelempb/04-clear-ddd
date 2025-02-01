import { QuestionEntity } from '@/enterprise/entities/question.entity'

export abstract class QuestionRepository {
  abstract findById(id: string): Promise<QuestionEntity | null>
  abstract findBySlug(slug: string): Promise<QuestionEntity | null>
  abstract create(entity: QuestionEntity): Promise<void>
  abstract delete(entity: QuestionEntity): Promise<void>
}
