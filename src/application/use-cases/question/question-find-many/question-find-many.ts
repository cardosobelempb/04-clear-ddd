import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'

export namespace Props {
  export interface Request {
    page: number
  }

  export interface Response {
    questions: QuestionEntity[]
  }
}

export class QuestionFindMany {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({ page }: Props.Request): Promise<Props.Response> {
    const questions = await this.questionRepository.findMany({ page })

    return { questions }
  }
}
