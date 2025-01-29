export namespace QuestionRequest {
  export interface Question {
    title: string
    content: string
    authorId: string
  }

  export interface Id {
    questionId: string
  }
}
