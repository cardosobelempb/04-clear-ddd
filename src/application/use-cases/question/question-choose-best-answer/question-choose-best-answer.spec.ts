import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'

import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { answerMake } from '../../answer/factories/answer.make'
import { questionMake } from '../make/question.make'
import { QuestionChooseBestAnswer } from './question-choose-best-answer'

let answerRepository: AnswerInMemoryRepository
let questionRepository: QuestionInMemoryRepository
let sut: QuestionChooseBestAnswer
describe('ChooseBestAnswer', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    answerRepository = new AnswerInMemoryRepository()
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

    await expect(() => {
      return sut.execute({
        answerId: answer.id.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
