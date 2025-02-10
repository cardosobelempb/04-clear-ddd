import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { AnswerDelete } from './answer-delete'
import { answerMake } from '../factories/answer.make'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'

let answerRepository: AnswerInMemoryRepository
let sut: AnswerDelete
describe('AnswerDelete', () => {
  beforeAll(() => {
    answerRepository = new AnswerInMemoryRepository()
    sut = new AnswerDelete(answerRepository)
  })
  it('should be able to delete answer', async () => {
    const newAnswer = answerMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('answer-1'),
    )

    await answerRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
    })

    expect(answerRepository.items).toHaveLength(0)
  })
  it('should not be able to delete answer from author user', async () => {
    const newAnswer = answerMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('answer-1'),
    )

    await answerRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundErro)
  })
})
