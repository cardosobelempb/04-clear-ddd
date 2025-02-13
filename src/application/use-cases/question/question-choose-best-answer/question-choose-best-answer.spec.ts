import { AnswerAttachmentInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-attachment-in-memory.repository'
import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { QuestionAttachmentInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-attachment-in-memory.repository'
import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'
import { NotAllowedErro } from '@/shared/application/service-erros/not-allowed.erro'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { answerMake } from '../../answer/factories/answer.make'
import { questionMake } from '../factories/question.make'
import { QuestionChooseBestAnswer } from './question-choose-best-answer'

let answerRepository: AnswerInMemoryRepository
let questionRepository: QuestionInMemoryRepository
let questionAttachmentInMemoryRepository: QuestionAttachmentInMemoryRepository
let answerAttachmentInMemoryRepository: AnswerAttachmentInMemoryRepository
let sut: QuestionChooseBestAnswer
describe('ChooseBestAnswer', () => {
  beforeAll(() => {
    questionAttachmentInMemoryRepository =
      new QuestionAttachmentInMemoryRepository()
    questionRepository = new QuestionInMemoryRepository(
      questionAttachmentInMemoryRepository,
    )
    answerAttachmentInMemoryRepository =
      new AnswerAttachmentInMemoryRepository()
    answerRepository = new AnswerInMemoryRepository(
      answerAttachmentInMemoryRepository,
    )
    sut = new QuestionChooseBestAnswer(answerRepository, questionRepository)
  })
  it('should be able to choose the question best answer', async () => {
    const question = questionMake()

    const answer = answerMake({
      questionId: new UniqueEntityUUID(question.id.toString()),
    })

    await questionRepository.create(question)
    await answerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(questionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })
  it('should not be able to choose another user question best answer', async () => {
    const question = questionMake({
      authorId: new UniqueEntityUUID('author-1'),
    })

    const answer = answerMake({
      questionId: new UniqueEntityUUID(question.id.toString()),
    })

    await questionRepository.create(question)
    await answerRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedErro)
  })
})
