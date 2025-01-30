import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/answer-in-memory.reposritory'

import { QuestionCreateUseCase } from './question-create'

test('Create an question', async () => {
  const questionRepository = new QuestionInMemoryRepository()
  const questionQuestion = new QuestionCreateUseCase(questionRepository)

  const { question } = await questionQuestion.execute({
    authorId: '1',
    title: 'Title question',
    content: 'content question',
  })

  expect(question.id).toBeTruthy()
})
