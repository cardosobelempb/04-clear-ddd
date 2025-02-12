import { QuestionEntity } from '@/enterprise/entities/question/question.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class QuestionRepository extends RepositoryAbstract<QuestionEntity> {
  abstract findBySlug(slug: string): Promise<QuestionEntity | null>
}
