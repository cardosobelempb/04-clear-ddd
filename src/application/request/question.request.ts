import { Slug } from "../../shared/domain/entities/value-objects/slug/slug"

export namespace QuestionRequest {
  export interface Question {
    title: string
    content: string
    slug: Slug
    authorId: string
  }

  export interface Id {
    questionId: string
  }
}
