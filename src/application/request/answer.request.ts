export namespace AnswerRequest {
  export interface Create {
    instructorId: string
    questionId: string
    content: string
  }

  export interface Id {
    answerId: string
  }
}
