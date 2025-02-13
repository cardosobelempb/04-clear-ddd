import { AnswerAttachmentInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-attachment-in-memory.repository'
import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { AnswerQuestion } from './answer-question'

let answerInMemoryRepository: AnswerInMemoryRepository
let answerAttachmentInMemoryRepository: AnswerAttachmentInMemoryRepository
let answerQuestion: AnswerQuestion
describe('Create answer', () => {
  beforeAll(() => {
    answerAttachmentInMemoryRepository =
      new AnswerAttachmentInMemoryRepository()
    answerInMemoryRepository = new AnswerInMemoryRepository(
      answerAttachmentInMemoryRepository,
    )
    answerQuestion = new AnswerQuestion(answerInMemoryRepository)
  })
  test('shoukd be able to create an answer', async () => {
    const result = await answerQuestion.execute({
      questionId: '1',
      authorId: '1',
      content: 'Conteúdo da resposta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(answerInMemoryRepository.items[0]).toEqual(result.value?.answer)
    expect(
      answerInMemoryRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(answerInMemoryRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityUUID('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityUUID('2'),
      }),
    ])
  })
})
