import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'

import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { questionMake } from '../factories/question.make'
import { QuestionDelete } from './question-delete'

let questionRepository: QuestionInMemoryRepository
let sut: QuestionDelete
describe('QuestionDelete', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    sut = new QuestionDelete(questionRepository)
  })
  it('should be able to delete question', async () => {
    const newQuestion = questionMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('question-1'),
    )

    await questionRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    })

    expect(questionRepository.items).toHaveLength(0)
  })
  it('should not be able to delete question from author user', async () => {
    const newQuestion = questionMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('question-1'),
    )

    await questionRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-1',
      questionId: 'question-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundErro)
  })
})
