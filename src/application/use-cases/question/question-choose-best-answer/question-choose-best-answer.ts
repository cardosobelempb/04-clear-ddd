import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { Either, left, right } from '@/shared/handle-erros/either'

export namespace QuestionChooseBestAnswer {
  export interface Request {
    authorId: string
    answerId: string
  }

  export type Response = Either<
    ResourceNotFoundErro | NotAllowedErro,
    {
      question: QuestionEntity
    }
  >
}

export class QuestionChooseBestAnswer {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly questionRepository: QuestionRepository,
  ) {}

  async execute({
    authorId,
    answerId,
  }: QuestionChooseBestAnswer.Request): Promise<QuestionChooseBestAnswer.Response> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundErro())
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundErro())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedErro())
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.update(question)

    return right({
      question,
    })
  }
}
