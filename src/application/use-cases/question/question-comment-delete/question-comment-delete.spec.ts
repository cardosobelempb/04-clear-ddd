import { QuestionCommentInMemoryRepository } from '@/enterprise/repositories/question/in-memory/question-comment-in-memory.reposritory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { questionCommentMake } from '../factories/question-commnet.make'
import { QuestionCommentDelete } from './question-comment-delete'

let questionCommentRepository: QuestionCommentInMemoryRepository
let sut: QuestionCommentDelete
describe('QuestionCommentDelete', () => {
  beforeAll(() => {
    questionCommentRepository = new QuestionCommentInMemoryRepository()
    sut = new QuestionCommentDelete(questionCommentRepository)
  })
  it('should be able to delete question comment', async () => {
    const questionComment = questionCommentMake()

    await questionCommentRepository.create(questionComment)

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    })

    expect(questionCommentRepository.items).toHaveLength(0)
  })
  it('should not be able to delete the question comment', async () => {
    const questionComment = questionCommentMake({
      authorId: new UniqueEntityUUID('author-1'),
    })

    await questionCommentRepository.create(questionComment)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        questionCommentId: questionComment.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
