import { QuestionCommentEntity } from '@/enterprise/entities/question-comment.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class QuestionCommentRepository extends RepositoryAbstract<QuestionCommentEntity> {}
