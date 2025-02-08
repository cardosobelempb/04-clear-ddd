import { QuestionInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-in-memory.reposritory'
import { QuestionCommentCreate } from './question-comment-create'
import { QuestionCommentInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-comment-in-memory.reposritory copy'
import { questionMake } from '../make/question.make'

let questionRepository: QuestionInMemoryRepository
let questionCommentRepository: QuestionCommentInMemoryRepository
let sut: QuestionCommentCreate
describe('QuestionCommentCreate', () => {
  beforeAll(() => {
    questionRepository = new QuestionInMemoryRepository()
    questionCommentRepository = new QuestionCommentInMemoryRepository()
    sut = new QuestionCommentCreate(
      questionCommentRepository,
      questionRepository,
    )
  })
  it('should be able to Create a question comment', async () => {
    const question = questionMake()

    await questionRepository.create(question)

    const { questionComment } = await sut.execute({
      authorId: 'author-1',
      questionId: question.id.toString(),
      content: 'content question',
    })

    expect(questionComment.id).toBeTruthy()
    expect(questionCommentRepository.items[0].id).toEqual(questionComment.id)
    expect(questionCommentRepository.items[0].content).toEqual(
      'content question',
    )
  })
})
