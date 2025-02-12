import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'

import { QuestionAttachmentInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-attachment-in-memory.repository'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { questionMake } from '../factories/question.make'
import { QuestionUpdate } from './question-update'
import { questionAttachmentMake } from '../factories/question-attachment.make'

let questionInMemoryRepository: QuestionInMemoryRepository
let questionAttachmentInMemoryRepository: QuestionAttachmentInMemoryRepository
let sut: QuestionUpdate
describe('QuestionUpdate', () => {
  beforeAll(() => {
    questionInMemoryRepository = new QuestionInMemoryRepository()
    questionAttachmentInMemoryRepository =
      new QuestionAttachmentInMemoryRepository()
    sut = new QuestionUpdate(
      questionAttachmentInMemoryRepository,
      questionInMemoryRepository,
    )
  })
  it('should be able to update question', async () => {
    const newQuestion = questionMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('question-1'),
    )

    await questionInMemoryRepository.create(newQuestion)

    questionAttachmentInMemoryRepository.items.push(
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
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      title: 'Title test',
      content: 'Content test',
      attachmentsIds: ['1', '3'],
    })

    expect(questionInMemoryRepository.items[0]).toMatchObject({
      title: 'Title test',
      content: 'Content test',
    })
    expect(
      questionInMemoryRepository.items[0].attachments.compareItems,
    ).toHaveLength(2)

    expect(
      questionInMemoryRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityUUID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityUUID('3') }),
    ])
  })
  it('should not be able to update question from author user', async () => {
    const newQuestion = questionMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('question-1'),
    )

    await questionInMemoryRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1',
      title: 'Title test',
      content: 'Content test',
      attachmentsIds: [],
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedErro)
  })
})
