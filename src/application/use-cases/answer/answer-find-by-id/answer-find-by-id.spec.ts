import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { answerMake } from '../make/answer.make'
import { AnswerById } from './answer-find-by-id'

let answerRepository: AnswerInMemoryRepository
let sut: AnswerById
describe('AnswerById', () => {
  beforeAll(() => {
    answerRepository = new AnswerInMemoryRepository()
    sut = new AnswerById(answerRepository)
  })
  it('should be able to answer by id', async () => {
    const newAnswer = answerMake({}, new UniqueEntityUUID('answer-1'))

    await answerRepository.create(newAnswer)

    const { answer } = await sut.execute({
      answerId: 'answer-1',
    })

    expect(answer.id).toBeTruthy()
    expect(answer.id).toEqual(newAnswer.id)
  })
})
