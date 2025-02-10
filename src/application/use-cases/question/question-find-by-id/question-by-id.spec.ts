import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'

import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { questionMake } from '../factories/question.make'
import { QuestionById } from './question-by-id'

let questionRepository: QuestionInMemoryRepository
let sut: QuestionById
describe('QuestionById', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    sut = new QuestionById(questionRepository)
  })
  it('should be able to questio by id', async () => {
    const newQuestion = questionMake({}, new UniqueEntityUUID('question-1'))

    await questionRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: 'question-1',
    })

    expect(result.value.question.id).toBeTruthy()
    expect(result.value.question.id).toEqual(newQuestion.id)
  })
})
