import { AnswerRequest } from '../../application/request/answer.request'
import { Entity } from '../../shared/domain/entities/entity'

export class Answer extends Entity<AnswerRequest.Answer> {

  get content() {
    return this.props.content
  }

}
