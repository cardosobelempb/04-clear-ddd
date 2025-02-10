import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'

import { questionMake } from '../factories/question.make'
import { QuestionFindMany } from './question-find-many'

let questionRepository: QuestionInMemoryRepository
let sut: QuestionFindMany
describe('QuestionMany', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    sut = new QuestionFindMany(questionRepository)
  })

  afterEach(() => {
    questionRepository.items = []
  })

  it('should be able to many questions', async () => {
    await questionRepository.create(
      questionMake({ createdAt: new Date(2025, 0, 20) }),
    )
    await questionRepository.create(
      questionMake({ createdAt: new Date(2025, 0, 18) }),
    )
    await questionRepository.create(
      questionMake({ createdAt: new Date(2025, 0, 23) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 18) }),
    ])
  })

  it('should be able to many pagination recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionRepository.create(questionMake())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
