import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace QuestionById {
  export interface Request {
    questionId: string
  }

  export type Response = Either<
    ResourceNotFoundErro,
    {
      question: QuestionEntity
    }
  >
}

export class QuestionById {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    questionId,
  }: QuestionById.Request): Promise<QuestionById.Response> {
    const question = await this.questionRepository.findById(questionId)
    if (!question) {
      return left(new ResourceNotFoundErro())
    }
    return right({ question })
  }
}
