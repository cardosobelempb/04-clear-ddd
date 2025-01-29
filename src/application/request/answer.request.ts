export namespace AnswerRequest {
  export interface Answer {
    content: string
    authorId: string
    questionId: string
  }

  export interface Create {
    instructorId: string
    questionId: string
    content: string
  }

  export interface Id {
    answerId: string
  }
}
