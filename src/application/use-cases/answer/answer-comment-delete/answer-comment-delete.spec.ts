import { AnswerCommentInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-comment-in-memory.reposritory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { answerCommentMake } from '../factories/answer-comment.make'
import { AnswerCommentDelete } from './answer-comment-delete'

let answerCommentInMemoryRepository: AnswerCommentInMemoryRepository
let sut: AnswerCommentDelete

describe('AnswerCommentDelete', () => {
  beforeAll(() => {
    answerCommentInMemoryRepository = new AnswerCommentInMemoryRepository()
    sut = new AnswerCommentDelete(answerCommentInMemoryRepository)
  })

  it('should be able to delete answer comment', async () => {
    const answerComment = answerCommentMake()

    await answerCommentInMemoryRepository.create(answerComment)

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    })

    expect(answerCommentInMemoryRepository.items).toHaveLength(0)
  })

  it('should not be able to delete the answer comment', async () => {
    const answerComment = answerCommentMake({
      authorId: new UniqueEntityUUID('author-1'),
    })

    await answerCommentInMemoryRepository.create(answerComment)

    await expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerCommentId: answerComment.id.toString(),
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
