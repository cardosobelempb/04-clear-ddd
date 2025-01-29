import { Answer } from '../../../domain/entities/answer'
import { AnswerRequest } from '../../request/answer.request'

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerRequest.Create) {
    const answer = new Answer(content)
    return answer
  }
}

new AnswerQuestionUseCase().execute({
  questionId: '1',
  instructorId: '2',
  content: 'Content',
})
