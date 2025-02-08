import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'

import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { questionMake } from '../factories/question.make'
import { QuestionUpdate } from './question-update'

let questionRepository: QuestionInMemoryRepository
let sut: QuestionUpdate
describe('QuestionUpdate', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    sut = new QuestionUpdate(questionRepository)
  })
  it('should be able to update question', async () => {
    const newQuestion = questionMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('question-1'),
    )

    await questionRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      title: 'Title test',
      content: 'Content test',
    })

    expect(questionRepository.items[0]).toMatchObject({
      title: 'Title test',
      content: 'Content test',
    })
  })
  it('should not be able to update question from author user', async () => {
    const newQuestion = questionMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('question-1'),
    )

    await questionRepository.create(newQuestion)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        questionId: 'question-1',
        title: 'Title test',
        content: 'Content test',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
