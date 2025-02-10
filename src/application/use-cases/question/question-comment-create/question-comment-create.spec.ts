import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'
import { QuestionCommentCreate } from './question-comment-create'
import { QuestionCommentInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-comment-in-memory.reposritory'
import { questionMake } from '../factories/question.make'

let questionRepository: QuestionInMemoryRepository
let questionCommentRepository: QuestionCommentInMemoryRepository
let sut: QuestionCommentCreate
describe('QuestionCommentCreate', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    questionCommentRepository = new QuestionCommentInMemoryRepository()
    sut = new QuestionCommentCreate(
      questionRepository,
      questionCommentRepository,
    )
  })
  it('should be able to Create a question comment', async () => {
    const question = questionMake()

    await questionRepository.create(question)

    await sut.execute({
      authorId: 'author-1',
      questionId: question.id.toString(),
      content: 'content question',
    })

    expect(questionCommentRepository.items[0].content).toEqual(
      'content question',
    )
  })
})
