import { Answer } from '../../../domain/entities/answer'
import { AnswerRepository } from '../../../domain/repositories/answer/answer.repository'
import { AnswerRequest } from '../../request/answer.request'

export class AnswerQuestionUseCase {

  constructor(private readonly answerRepository: AnswerRepository){}

  async execute({ instructorId, questionId, content }: AnswerRequest.Create) {
    const answer = new Answer({
      authorId: instructorId,
      questionId,
      content
    })

    await this.answerRepository.create(answer)
    return answer
  }
}

