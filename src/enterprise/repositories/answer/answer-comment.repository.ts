import { AnswerCommentEntity } from '@/enterprise/entities/answer-comment.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'

export abstract class AnswerCommentRepository extends RepositoryAbstract<AnswerCommentEntity> {
  abstract answerComments(
    questionCommentId: string,
    params: Pagination.Params,
  ): Promise<AnswerCommentEntity[]>
}
