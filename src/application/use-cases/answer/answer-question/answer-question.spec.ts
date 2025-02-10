import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'

import { AnswerQuestion } from './answer-question'

let answerRepository: AnswerInMemoryRepository
let answerQuestion: AnswerQuestion
describe('Create answer', () => {
  beforeAll(() => {
    answerRepository = new AnswerInMemoryRepository()
    answerQuestion = new AnswerQuestion(answerRepository)
  })
  test('shoukd be able to create an answer', async () => {
    const result = await answerQuestion.execute({
      questionId: '1',
      authorId: '1',
      content: 'Conteúdo da resposta',
    })

    expect(result.isRight()).toBe(true)
    expect(answerRepository.items[0]).toEqual(result.value?.answer)
  })
})
