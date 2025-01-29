import { Answer } from "../../entities/answer";

export abstract class AnswerRepository {
  abstract create(answer: Answer): Promise<void>
}
