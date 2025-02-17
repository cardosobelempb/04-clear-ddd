import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { DomainEvent } from '@/shared/events/domain-event'
import { AnswerEntity } from '../answer.entity'

export class AnswerCreatedEvent implements DomainEvent {
  ocurredAt: Date
  answer: AnswerEntity

  constructor(answer: AnswerEntity) {
    this.answer = answer
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityUUID {
    return this.answer.id
  }
}
