import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'
import { Slug } from '@/shared/enterprise/entities/value-objects/slug/slug'

import { questionMake } from '../make/question.make'
import { QuestionBySlug } from './question-find-by-slug'

let questionRepository: QuestionInMemoryRepository
let sut: QuestionBySlug
describe('QuestionBySlug', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    sut = new QuestionBySlug(questionRepository)
  })
  it('should be able to questio by slug', async () => {
    const newQuestion = questionMake({
      slug: Slug.create('example-question'),
    })

    await questionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
