import { QuestionEntity } from '@/enterprise/entities/question.entity'

export abstract class QuestionRepository {
  abstract findBySlug(slug: string): Promise<QuestionEntity | null>
  abstract create(entity: QuestionEntity): Promise<void>
}
