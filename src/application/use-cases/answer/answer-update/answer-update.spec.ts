import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'

import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { AnswerUpdate } from './answer-update'
import { answerMake } from '../factories/answer.make'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'

let answerRepository: AnswerInMemoryRepository
let sut: AnswerUpdate
describe('AnswerUpdate', () => {
  beforeAll(() => {
    answerRepository = new AnswerInMemoryRepository()
    sut = new AnswerUpdate(answerRepository)
  })
  it('should be able to update answer', async () => {
    const newAnswer = answerMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('answer-1'),
    )

    await answerRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'Content test',
    })

    expect(answerRepository.items[0]).toMatchObject({
      content: 'Content test',
    })
  })
  it('should not be able to update answer from author user', async () => {
    const newAnswer = answerMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('answer-1'),
    )

    await answerRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: 'answer-1',
      content: 'Content test',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedErro)
  })
})
