import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'

import { answerMake } from '../make/answer.make'
import { AnswerManyQuestionId } from './answer-many-question-id'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

let answerRepository: AnswerInMemoryRepository
let sut: AnswerManyQuestionId
describe('AnswerManyQuestionId', () => {
  beforeAll(() => {
    answerRepository = new AnswerInMemoryRepository()
    sut = new AnswerManyQuestionId(answerRepository)
  })

  afterEach(() => {
    answerRepository.items = []
  })

  it('should be able to many answers', async () => {
    await answerRepository.create(
      answerMake({ questionId: new UniqueEntityUUID('question-1') }),
    )
    await answerRepository.create(
      answerMake({ questionId: new UniqueEntityUUID('question-1') }),
    )
    await answerRepository.create(
      answerMake({ questionId: new UniqueEntityUUID('question-1') }),
    )

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to many pagination question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await answerRepository.create(
        answerMake({ questionId: new UniqueEntityUUID('question-1') }),
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
