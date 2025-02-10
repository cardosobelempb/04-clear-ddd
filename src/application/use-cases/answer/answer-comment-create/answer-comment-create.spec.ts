import { AnswerCommentInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-comment-in-memory.reposritory'
import { AnswerInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-in-memory.reposritory'
import { answerMake } from '../factories/answer.make'
import { AnswerCommentCreate } from './answer-comment-create'

let answerRepository: AnswerInMemoryRepository
let answerCommentRepository: AnswerCommentInMemoryRepository
let sut: AnswerCommentCreate
describe('AnswerCommentCreate', () => {
  beforeAll(() => {
    answerRepository = new AnswerInMemoryRepository()
    answerCommentRepository = new AnswerCommentInMemoryRepository()
    sut = new AnswerCommentCreate(answerRepository, answerCommentRepository)
  })
  it('should be able to Create a answer comment', async () => {
    const answerComment = answerMake()

    await answerRepository.create(answerComment)

    await sut.execute({
      authorId: 'author-1',
      answerId: answerComment.id.toString(),
      content: 'content answer',
    })

    expect(answerCommentRepository.items[0].content).toEqual('content answer')
  })
})
