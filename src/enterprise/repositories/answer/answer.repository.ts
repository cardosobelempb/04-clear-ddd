import { AnswerEntity } from '@/enterprise/entities/answer/answer.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export abstract class AnswerRepository extends RepositoryAbstract<AnswerEntity> {
  abstract findManyQuestionId(
    questioId: string,
    params: Pagination.Params,
  ): Promise<AnswerEntity[]>
}
