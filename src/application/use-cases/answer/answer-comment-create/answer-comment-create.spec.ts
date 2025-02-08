import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { AnswerCommentCreate } from './answer-comment-create'
import { AnswerCommentInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-comment-in-memory.reposritory'
import { answerMake } from '../make/answer.make'

let answerRepository: AnswerInMemoryRepository
let answerCommentRepository: AnswerCommentInMemoryRepository
let sut: AnswerCommentCreate
describe('AnswerCommentCreate', () => {
  beforeAll(() => {
    answerRepository = new AnswerInMemoryRepository()
    answerCommentRepository = new AnswerCommentInMemoryRepository()
    sut = new AnswerCommentCreate(answerCommentRepository, answerRepository)
  })
  it('should be able to Create a answer comment', async () => {
    const answer = answerMake()

    await answerRepository.create(answer)

    const { answerComment } = await sut.execute({
      authorId: 'author-1',
      answerId: answer.id.toString(),
      content: 'content answer',
    })

    expect(answerComment.id).toBeTruthy()
    expect(answerCommentRepository.items[0].id).toEqual(answerComment.id)
    expect(answerCommentRepository.items[0].content).toEqual('content answer')
  })
})
