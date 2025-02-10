import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace QuestionDelete {
  export interface Request {
    authorId: string
    questionId: string
  }

  export type Response = Either<ResourceNotFoundErro | NotAllowedErro, object>
}

export class QuestionDelete {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: QuestionDelete.Request): Promise<QuestionDelete.Response> {
    const question = await this.questionRepository.findById(questionId)
    if (!question) {
      return left(new ResourceNotFoundErro())
    }
    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedErro())
    }
    await this.questionRepository.delete(question)
    return right({})
  }
}
