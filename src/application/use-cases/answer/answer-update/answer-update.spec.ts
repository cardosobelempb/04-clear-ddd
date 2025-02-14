import { AnswerAttachmentInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-attachment-in-memory.repository'
import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { answerAttachmentMake } from '../factories/answer-attachment.make'
import { answerMake } from '../factories/answer.make'
import { AnswerUpdate } from './answer-update'

let answerInMemoryRepository: AnswerInMemoryRepository
let answerAttachmentInMemoryRepository: AnswerAttachmentInMemoryRepository

let sut: AnswerUpdate
describe('AnswerUpdate', () => {
  beforeAll(() => {
    answerAttachmentInMemoryRepository =
      new AnswerAttachmentInMemoryRepository()
    answerInMemoryRepository = new AnswerInMemoryRepository(
      answerAttachmentInMemoryRepository,
    )
    answerAttachmentInMemoryRepository =
      new AnswerAttachmentInMemoryRepository()
    sut = new AnswerUpdate(
      answerAttachmentInMemoryRepository,
      answerInMemoryRepository,
    )
  })
  it('should be able to update answer', async () => {
    const newAnswer = answerMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('answer-1'),
    )

    await answerInMemoryRepository.create(newAnswer)

    answerAttachmentInMemoryRepository.items.push(
      answerAttachmentMake({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityUUID('1'),
      }),
      answerAttachmentMake({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntityUUID('2'),
      }),
    )

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: 'author-1',
      content: 'Content test',
      attachmentsIds: ['1', '3'],
    })

    expect(answerInMemoryRepository.items[0]).toMatchObject({
      content: 'Content test',
    })

    expect(
      answerInMemoryRepository.items[0].attachments.compareItems,
    ).toHaveLength(2)

    expect(answerInMemoryRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityUUID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityUUID('3') }),
    ])
  })
  it('should not be able to update answer from author user', async () => {
    const newAnswer = answerMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('answer-1'),
    )

    await answerInMemoryRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: 'answer-1',
      content: 'Content test',
      attachmentsIds: [],
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedErro)
  })
})
