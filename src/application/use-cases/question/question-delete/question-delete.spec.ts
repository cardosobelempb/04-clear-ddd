import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'

import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { questionCreateMake } from '../question-create/question-create.make'
import { QuestionDelete } from './question-delete'

let questionRepository: QuestionInMemoryRepository
let sut: QuestionDelete
describe('QuestionDelete', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    sut = new QuestionDelete(questionRepository)
  })
  it('should be able to delete question', async () => {
    const newQuestion = questionCreateMake(
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
    const newQuestion = questionCreateMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('question-1'),
    )

    await questionRepository.create(newQuestion)

    await expect(() => {
      return sut.execute({
        authorId: 'author-1',
        questionId: 'question-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
