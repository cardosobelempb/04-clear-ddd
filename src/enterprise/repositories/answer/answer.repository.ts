import { AnswerEntity } from '@/enterprise/entities/answer.entity'
import { RepositoryAbstract } from '@/shared/enterprise/repository/repository.abstract'

export abstract class AnswerRepository extends RepositoryAbstract<AnswerEntity> {}
