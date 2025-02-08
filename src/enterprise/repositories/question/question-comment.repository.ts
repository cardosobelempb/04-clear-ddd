import { QuestionCommentEntity } from '@/enterprise/entities/question-comment.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export abstract class QuestionCommentRepository extends RepositoryAbstract<QuestionCommentEntity> {
  abstract questionComments(
    questionCommentId: string,
    params: Pagination.Params,
  ): Promise<QuestionCommentEntity[]>
}
