import { AnswerAttachmentInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-attachment-in-memory.repository'
import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { NotificationInMemoryRespository } from '@/enterprise/repositories/notification/in-memory/notification-in-memory.repository'
import { QuestionAttachmentInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-attachment-in-memory.repository'
import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'
import { waitFor } from '@/shared/utils/wait-for'
import { MockInstance } from 'vitest'

import { answerMake } from '../../answer/factories/answer.make'
import { questionMake } from '../../question/factories/question.make'
import { NotificationSendUseCase } from '../notification-send/notification-send.usecase'
import { OnAnswerCreated } from './on-answer-created'

let answerAttachmentInmemoryRepository: AnswerAttachmentInMemoryRepository
let questionAttachmentInmemoryRepository: QuestionAttachmentInMemoryRepository
let answerInMemoryRepository: AnswerInMemoryRepository
let questionInMemoryRepository: QuestionInMemoryRepository
let notificationRepository: NotificationInMemoryRespository
let notificatioSendUseCase: NotificationSendUseCase

let sendNotificationExecuteSpy: MockInstance

describe('On Answer Created', () => {
  beforeEach(() => {
    answerAttachmentInmemoryRepository = new AnswerAttachmentInMemoryRepository()
    answerInMemoryRepository = new AnswerInMemoryRepository(answerAttachmentInmemoryRepository)
    questionAttachmentInmemoryRepository = new QuestionAttachmentInMemoryRepository()
    questionInMemoryRepository = new QuestionInMemoryRepository(questionAttachmentInmemoryRepository)
    notificationRepository = new NotificationInMemoryRespository()
    notificatioSendUseCase = new NotificationSendUseCase(notificationRepository)

    sendNotificationExecuteSpy = vi.spyOn(notificatioSendUseCase, 'execute')

    new OnAnswerCreated(questionInMemoryRepository, notificatioSendUseCase)
  })

  it('should  send a notification when an answer is created', async () => {
    const question = questionMake()
    const answer = answerMake({ questionId: question.id })

    questionInMemoryRepository.create(question)
    answerInMemoryRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
