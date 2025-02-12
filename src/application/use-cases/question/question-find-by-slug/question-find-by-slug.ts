import { QuestionEntity } from '@/enterprise/entities/question/question.entity'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace QuestionBySlug {
  export interface Request {
    slug: string
  }

  export type Response = Either<
    ResourceNotFoundErro,
    {
      question: QuestionEntity
    }
  >
}

export class QuestionBySlug {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    slug,
  }: QuestionBySlug.Request): Promise<QuestionBySlug.Response> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundErro())
    }

    return right({ question })
  }
}
