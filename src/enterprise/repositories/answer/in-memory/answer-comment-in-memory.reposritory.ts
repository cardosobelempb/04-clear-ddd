import { AnswerCommentEntity } from '@/enterprise/entities/answer/answer-comment.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { AnswerCommentRepository } from '../answer-comment.repository'

export class AnswerCommentInMemoryRepository
  implements AnswerCommentRepository
{
  public items: AnswerCommentEntity[] = []

  async findById(id: string): Promise<AnswerCommentEntity | null> {
    const answer = this.items.find((item) => item.id.toString() === id)
    if (!answer) {
      return null
    }

    return answer
  }

  async findMany({ page }: Pagination.Params): Promise<AnswerCommentEntity[]> {
    const answers = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async answerComments(
    answerId: string,
    { page }: Pagination.Params,
  ): Promise<AnswerCommentEntity[]> {
    const answers = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(entity: AnswerCommentEntity): Promise<void> {
    this.items.push(entity)
  }

  async update(entity: AnswerCommentEntity): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity: AnswerCommentEntity): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === entity.id)
    this.items.splice(itemIndex, 1)
  }
}
