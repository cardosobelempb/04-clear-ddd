import { QuestionAttachmentInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-attachment-in-memory.repository'
import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { QuestionCreate } from './question-create'

let questionRepository: QuestionInMemoryRepository
let questionAttachmentInmemoryRepository: QuestionAttachmentInMemoryRepository
let sut: QuestionCreate
describe('Create question', () => {
  beforeAll(() => {
    questionAttachmentInmemoryRepository =
      new QuestionAttachmentInMemoryRepository()
    questionRepository = new QuestionInMemoryRepository(
      questionAttachmentInmemoryRepository,
    )
    sut = new QuestionCreate(questionRepository)
  })
  it('should be able to Create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'Title question',
      content: 'content question',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(questionRepository.items[0]).toEqual(result.value?.question)
    expect(questionRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(questionRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityUUID('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityUUID('2'),
      }),
    ])
  })
})
