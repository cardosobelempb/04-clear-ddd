import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { DomainEvent } from '@/shared/events/domain-event'

import { QuestionEntity } from '../question.entity'

export class QuestionBestAnswerChosenEvent implements DomainEvent {
  ocurredAt: Date
  question: QuestionEntity
  bestAnswerId: UniqueEntityUUID

  constructor(question: QuestionEntity, bestAnswerId: UniqueEntityUUID) {
    this.question = question
    this.bestAnswerId = bestAnswerId
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityUUID {
    return this.question.id
  }
}
