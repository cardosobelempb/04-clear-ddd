import { QuestionAttachmentInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-attachment-in-memory.repository'
import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { questionAttachmentMake } from '../factories/question-attachment.make'
import { questionMake } from '../factories/question.make'
import { QuestionDelete } from './question-delete'

let questionInMemoryRepository: QuestionInMemoryRepository
let questionAttachmentInmemoryRepository: QuestionAttachmentInMemoryRepository
let sut: QuestionDelete

describe('QuestionDelete', () => {
  beforeAll(() => {
    questionAttachmentInmemoryRepository = new QuestionAttachmentInMemoryRepository()
    questionInMemoryRepository = new QuestionInMemoryRepository(questionAttachmentInmemoryRepository)
    sut = new QuestionDelete(questionInMemoryRepository)
  })
  it('should be able to delete question', async () => {
    const newQuestion = questionMake({ authorId: new UniqueEntityUUID('author-1') }, new UniqueEntityUUID('question-1'))

    await questionInMemoryRepository.create(newQuestion)

    questionAttachmentInmemoryRepository.items.push(
      questionAttachmentMake({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityUUID('1'),
      }),
      questionAttachmentMake({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityUUID('2'),
      }),
    )

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
    })

    expect(questionInMemoryRepository.items).toHaveLength(0)
    expect(questionAttachmentInmemoryRepository.items).toHaveLength(0)
  })

  it('should not be able to delete question from author user', async () => {
    const newQuestion = questionMake({ authorId: new UniqueEntityUUID('author-1') }, new UniqueEntityUUID('question-1'))

    await questionInMemoryRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-1',
      questionId: 'question-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundErro)
  })
})
