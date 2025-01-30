import { UniqueEnttiyUUID } from '../../shared/domain/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace AnswerRequest {
  export interface Answer {
    authorId: UniqueEnttiyUUID
    questionId: UniqueEnttiyUUID
    content: string
    createdAt: Date
    updatedAt?: Date
  }

  export interface Create {
    instructorId: UniqueEnttiyUUID
    questionId: UniqueEnttiyUUID
    content: string
  }

  export interface Id {
    answerId: UniqueEnttiyUUID
  }
}
