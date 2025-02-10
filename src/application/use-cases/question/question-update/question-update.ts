import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace QuestionUpdate {
  export interface Request {
    authorId: string
    questionId: string
    title: string
    content: string
  }

  export type Response = Either<ResourceNotFoundErro | NotAllowedErro, object>
}

export class QuestionUpdate {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: QuestionUpdate.Request): Promise<QuestionUpdate.Response> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFoundErro())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedErro())
    }

    question.title = title
    question.content = content

    await this.questionRepository.update(question)

    return right({})
  }
}
