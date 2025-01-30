import { Answer } from '../../../domain/entities/answer'
import { AnswerRepository } from '../../../domain/repositories/answer/answer.repository'
import { UniqueEnttiyUUID } from '../../../shared/domain/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

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
    const answer = Answer.create({
      content,
      authorId: new UniqueEnttiyUUID(authorId),
      questionId: new UniqueEnttiyUUID(questionId),
    })

    await this.answerRepository.create(answer)
    return answer
  }
}
