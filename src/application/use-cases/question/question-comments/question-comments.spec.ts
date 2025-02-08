import { QuestionCommentInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-comment-in-memory.reposritory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { questionCommentMake } from '../factories/question-commnet.make'
import { QuestionCommentsService } from './question-comments.service'

let questionComentRepository: QuestionCommentInMemoryRepository
let sut: QuestionCommentsService
describe('QuestionCommentsService', () => {
  beforeAll(() => {
    questionComentRepository = new QuestionCommentInMemoryRepository()
    sut = new QuestionCommentsService(questionComentRepository)
  })

  afterEach(() => {
    questionComentRepository.items = []
  })

  it('should be able to question comments', async () => {
    await questionComentRepository.create(
      questionCommentMake({ questionId: new UniqueEntityUUID('question-1') }),
    )
    await questionComentRepository.create(
      questionCommentMake({ questionId: new UniqueEntityUUID('question-1') }),
    )
    await questionComentRepository.create(
      questionCommentMake({ questionId: new UniqueEntityUUID('question-1') }),
    )

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(questionComments).toHaveLength(3)
  })

  it('should be able to pagination question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await questionComentRepository.create(
        questionCommentMake({ questionId: new UniqueEntityUUID('question-1') }),
      )
    }

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(questionComments).toHaveLength(2)
  })
})
