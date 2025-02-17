import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { answerMake } from '../../answer/factories/answer.make'
import { questionMake } from '../../question/factories/question.make'
import { OnAnswerCreated } from './on-answer-created'
import { AnswerAttachmentInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-attachment-in-memory.repository'

let answerAttachmentInmemoryRepository: AnswerAttachmentInMemoryRepository
let answerInMemoryRepository: AnswerInMemoryRepository
describe('On Answer Created', () => {
  beforeEach(() => {
    answerAttachmentInmemoryRepository = new AnswerAttachmentInMemoryRepository()
    answerInMemoryRepository = new AnswerInMemoryRepository(answerAttachmentInmemoryRepository)
  })

  it('should  send a notification when an answer is created', async () => {
    const onAnswerCreate = new OnAnswerCreated()
    const question = questionMake()
    const answer = answerMake({ questionId: question.id })

    // inMemoryQuestionsRepository.create(question)
    answerInMemoryRepository.create(answer)

    // await waitFor(() => {
    //   expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    // })
  })
})
