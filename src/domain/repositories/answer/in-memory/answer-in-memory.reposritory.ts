import { Answer } from "../../../entities/answer";
import { AnswerRepository } from "../answer.repository";

export class AnswerInMemoryRepository implements AnswerRepository {
  async create(answer: Answer): Promise<void> {
    return;
  }
}
