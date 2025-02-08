import { QuestionCommentEntity } from '@/enterprise/entities/question-comment.entity'
import { Pagination } from '@/shared/enterprise/repository/types/pagination'
import { QuestionCommentRepository } from '../question-comment.repository'

export class QuestionCommentInMemoryRepository
  implements QuestionCommentRepository
{
  public items: QuestionCommentEntity[] = []

  async findById(id: string): Promise<QuestionCommentEntity | null> {
    const question = this.items.find((item) => item.id.toString() === id)
    if (!question) {
      return null
    }

    return question
  }

  async findMany({
    page,
  }: Pagination.Params): Promise<QuestionCommentEntity[]> {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async create(entity: QuestionCommentEntity): Promise<void> {
    this.items.push(entity)
  }

  async update(entity: QuestionCommentEntity): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === entity.id)
    this.items[itemIndex] = entity
  }

  async delete(entity: QuestionCommentEntity): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === entity.id)
    this.items.splice(itemIndex, 1)
  }
}
