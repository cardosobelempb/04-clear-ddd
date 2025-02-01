import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'

import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { questionCreateMake } from '../question-create/question-create.make'
import { QuestionById } from './question-by-id'

let questionRepository: QuestionInMemoryRepository
let sut: QuestionById
describe('QuestionById', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    sut = new QuestionById(questionRepository)
  })
  it('should be able to questio by id', async () => {
    const newQuestion = questionCreateMake(
      {},
      new UniqueEntityUUID('question-1'),
    )

    await questionRepository.create(newQuestion)

    const { question } = await sut.execute({
      questionId: 'question-1',
    })

    expect(question.id).toBeTruthy()
    expect(question.id).toEqual(newQuestion.id)
  })
})
