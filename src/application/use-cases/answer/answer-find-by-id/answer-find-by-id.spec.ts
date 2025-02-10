import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { answerMake } from '../factories/answer.make'
import { AnswerById } from './answer-find-by-id'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'

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

    const result = await sut.execute({
      answerId: 'answer-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value.answer.id).toEqual(newAnswer.id)
  })
})
