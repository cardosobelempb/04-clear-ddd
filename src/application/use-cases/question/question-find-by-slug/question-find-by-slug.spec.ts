import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'
import { Slug } from '@/shared/enterprise/entities/value-objects/slug/slug'

import { questionMake } from '../factories/question.make'
import { QuestionBySlug } from './question-find-by-slug'
import { QuestionAttachmentInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-attachment-in-memory.repository'

let questionRepository: QuestionInMemoryRepository
let questionAttachmentInmemoryRepository: QuestionAttachmentInMemoryRepository
let sut: QuestionBySlug
describe('QuestionBySlug', () => {
  beforeAll(() => {
    questionAttachmentInmemoryRepository =
      new QuestionAttachmentInMemoryRepository()
    questionRepository = new QuestionInMemoryRepository(
      questionAttachmentInmemoryRepository,
    )
    sut = new QuestionBySlug(questionRepository)
  })
  it('should be able to questio by slug', async () => {
    const newQuestion = questionMake({
      slug: Slug.create('example-question'),
    })

    await questionRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.title).toEqual(newQuestion.title)
  })
})
