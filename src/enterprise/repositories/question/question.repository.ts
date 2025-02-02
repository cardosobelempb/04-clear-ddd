import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { Pagination } from '@/shared/enterprise/repository/pagination'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class QuestionRepository extends RepositoryAbstract<QuestionEntity> {
  abstract findBySlug(slug: string): Promise<QuestionEntity | null>
  abstract findManyRecent(params: Pagination.Params): Promise<QuestionEntity[]>
}
