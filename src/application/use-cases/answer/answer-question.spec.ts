import { expect, test } from 'vitest'

import { AnswerInMemoryRepository } from '../../../domain/repositories/answer/in-memory/answer-in-memory.reposritory'
import { AnswerQuestionUseCase } from './answer-question'

test('Create an answer', async () => {
  const answerRepository = new AnswerInMemoryRepository()
  const answerQuestion = new AnswerQuestionUseCase(answerRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
