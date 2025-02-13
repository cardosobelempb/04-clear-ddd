import { AnswerAttachmentInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-attachment-in-memory.repository'
import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { ResourceNotFoundErro } from '@/shared/application/service-erros/resource-not-found.error'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { answerAttachmentMake } from '../factories/answer-attachment.make'
import { answerMake } from '../factories/answer.make'
import { AnswerDelete } from './answer-delete'

let answerInMemoryRepository: AnswerInMemoryRepository
let answerAttachmentInMemoryRepository: AnswerAttachmentInMemoryRepository
let sut: AnswerDelete

describe('AnswerDelete', () => {
  beforeAll(() => {
    answerAttachmentInMemoryRepository =
      new AnswerAttachmentInMemoryRepository()
    answerInMemoryRepository = new AnswerInMemoryRepository(
      answerAttachmentInMemoryRepository,
    )
    sut = new AnswerDelete(answerInMemoryRepository)
  })

  it('should be able to delete answer', async () => {
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
      authorId: 'author-1',
      answerId: 'answer-1',
    })

    expect(answerInMemoryRepository.items).toHaveLength(0)
    expect(answerAttachmentInMemoryRepository.items).toHaveLength(0)
  })

  it('should not be able to delete answer from author user', async () => {
    const newAnswer = answerMake(
      { authorId: new UniqueEntityUUID('author-1') },
      new UniqueEntityUUID('answer-1'),
    )

    await answerInMemoryRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundErro)
  })
})
