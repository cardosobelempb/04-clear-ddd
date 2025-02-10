import { AnswerCommentInMemoryRepository } from '@/enterprise/repositories/answer/in-memory/answer-comment-in-memory.reposritory'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

import { AnswerCommentsService } from './answer-comments.service'
import { answerCommentMake } from '../factories/answer-comment.make'

let answerCommentRepository: AnswerCommentInMemoryRepository
let sut: AnswerCommentsService
describe('AnswerCommentsService', () => {
  beforeAll(() => {
    answerCommentRepository = new AnswerCommentInMemoryRepository()
    sut = new AnswerCommentsService(answerCommentRepository)
  })

  afterEach(() => {
    answerCommentRepository.items = []
  })

  it('should be able to answer comments', async () => {
    await answerCommentRepository.create(
      answerCommentMake({ answerId: new UniqueEntityUUID('answer-1') }),
    )
    await answerCommentRepository.create(
      answerCommentMake({ answerId: new UniqueEntityUUID('answer-1') }),
    )
    await answerCommentRepository.create(
      answerCommentMake({ answerId: new UniqueEntityUUID('answer-1') }),
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to pagination answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await answerCommentRepository.create(
        answerCommentMake({ answerId: new UniqueEntityUUID('answer-1') }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
