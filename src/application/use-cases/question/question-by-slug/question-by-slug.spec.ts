import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'

import { QuestionBySlug } from './question-by-slug'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { QuestionEntity } from '@/enterprise/entities/question.entity'
import { Slug } from '@/shared/enterprise/entities/value-objects/slug/slug'

let questionRepository: QuestionInMemoryRepository
let sut: QuestionBySlug
describe('QuestionBySlug', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    sut = new QuestionBySlug(questionRepository)
  })
  it('should be able to questio by slug', async () => {
    const newQuestion = QuestionEntity.create({
      authorId: new UniqueEntityUUID(),
      title: 'Example question',
      slug: Slug.create('example-question'),
      content: 'Example content',
    })

    await questionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
