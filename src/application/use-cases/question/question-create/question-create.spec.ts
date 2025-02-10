import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'

import { QuestionCreate } from './question-create'

let questionRepository: QuestionInMemoryRepository
let sut: QuestionCreate
describe('Create question', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    sut = new QuestionCreate(questionRepository)
  })
  it('should be able to Create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Title question',
      content: 'content question',
    })

    expect(result.isRight()).toBe(true)
    expect(questionRepository.items[0]).toEqual(result.value?.question)
  })
})
