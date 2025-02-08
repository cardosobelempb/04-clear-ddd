import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'

import { answerMake } from '../factories/answer.make'
import { AnswerFindMany } from './answer-find-many'

let answerRepository: AnswerInMemoryRepository
let sut: AnswerFindMany
describe('AnswerMany', () => {
  beforeAll(() => {
    answerRepository = new AnswerInMemoryRepository()
    sut = new AnswerFindMany(answerRepository)
  })

  afterEach(() => {
    answerRepository.items = []
  })

  it('should be able to many answers', async () => {
    await answerRepository.create(
      answerMake({ createdAt: new Date(2025, 0, 20) }),
    )
    await answerRepository.create(
      answerMake({ createdAt: new Date(2025, 0, 18) }),
    )
    await answerRepository.create(
      answerMake({ createdAt: new Date(2025, 0, 23) }),
    )

    const { answers } = await sut.execute({
      page: 1,
    })

    expect(answers).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 18) }),
    ])
  })

  it('should be able to many pagination recent answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await answerRepository.create(answerMake())
    }

    const { answers } = await sut.execute({
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
