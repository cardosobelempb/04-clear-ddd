import { AnswerEntity } from '@/enterprise/entities/answer.entity'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace Answer {
  export interface Request {
    authorId: string
    questionId: string
    content: string
  }

  export interface Response {
    authorId: string
    questionId: string
    content: string
  }
}

export class AnswerQuestionUseCase {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async execute({ authorId, questionId, content }: Answer.Request) {
    const { answer } = AnswerEntity.create({
      content,
      authorId: new UniqueEntityUUID(authorId),
      questionId: new UniqueEntityUUID(questionId),
    })

    await this.answerRepository.create(answer)
    return answer
  }
}
