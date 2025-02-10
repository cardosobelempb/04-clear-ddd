import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { Either, right } from '@/shared/handle-erros/either'

export namespace Props {
  export interface Request {
    page: number
  }

  export type Response = Either<
    null,
    {
      questions: QuestionEntity[]
    }
  >
}

export class QuestionFindMany {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({ page }: Props.Request): Promise<Props.Response> {
    const questions = await this.questionRepository.findMany({ page })

    return right({ questions })
  }
}
