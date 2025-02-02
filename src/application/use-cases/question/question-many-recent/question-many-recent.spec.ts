import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'

import { questionMake } from '../make/question.make'
import { QuestionManyRecent } from './question-many-recent'

let questionRepository: QuestionInMemoryRepository
let sut: QuestionManyRecent
describe('QuestionManyRecent', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    sut = new QuestionManyRecent(questionRepository)
  })

  afterEach(() => {
    questionRepository.items = []
  })

  it('should be able to many recent questions', async () => {
    await questionRepository.create(
      questionMake({ createdAt: new Date(2025, 0, 20) }),
    )
    await questionRepository.create(
      questionMake({ createdAt: new Date(2025, 0, 18) }),
    )
    await questionRepository.create(
      questionMake({ createdAt: new Date(2025, 0, 23) }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 18) }),
    ])
  })

  it('should be able to many pagination recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionRepository.create(questionMake())
    }

    const { questions } = await sut.execute({
      page: 2,
    })
    console.log(questions.length)

    expect(questions).toHaveLength(2)
  })
})
