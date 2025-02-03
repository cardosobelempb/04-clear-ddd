import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { answerMake } from '../make/answer.make'
import { AnswerFindManyQuestionId } from './answer-find-many-question-id'

let answerRepository: AnswerInMemoryRepository
let sut: AnswerFindManyQuestionId
describe('AnswerFindManyQuestionId', () => {
  beforeAll(() => {
    answerRepository = new AnswerInMemoryRepository()
    sut = new AnswerFindManyQuestionId(answerRepository)
  })

  afterEach(() => {
    answerRepository.items = []
  })

  it('should be able to find many answers', async () => {
    await answerRepository.create(
      answerMake({
        questionId: new UniqueEntityUUID('question-1'),
      }),
    )
    await answerRepository.create(
      answerMake({
        questionId: new UniqueEntityUUID('question-1'),
      }),
    )
    await answerRepository.create(
      answerMake({
        questionId: new UniqueEntityUUID('question-1'),
      }),
    )

    const { answers } = await sut.execute({ questioId: 'question-1', page: 1 })

    expect(answers).toHaveLength(3)
  })

  it('should be able to find many pagination question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await answerRepository.create(
        answerMake({ questionId: new UniqueEntityUUID(`question-1`) }),
      )
    }

    const { answers } = await sut.execute({
      questioId: 'question-1',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
