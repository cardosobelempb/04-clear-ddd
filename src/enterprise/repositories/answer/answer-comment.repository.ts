import { AnswerCommentEntity } from '@/enterprise/entities/answer-comment.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class AnswerCommentRepository extends RepositoryAbstract<AnswerCommentEntity> {}
