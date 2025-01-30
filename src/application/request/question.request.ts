import { Slug } from '../../shared/domain/entities/value-objects/slug/slug'
import { UniqueEnttiyUUID } from '../../shared/domain/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace QuestionRequest {
  export interface Question {
    authorId: UniqueEnttiyUUID
    bestAnswerId?: UniqueEnttiyUUID
    title: string
    content: string
    slug: Slug
    createdAt: Date
    updatedAt?: Date
  }

  export interface Id {
    questionId: UniqueEnttiyUUID
  }
}
