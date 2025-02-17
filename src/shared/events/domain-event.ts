import { UniqueEntityUUID } from '../enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export interface DomainEvent {
  ocurredAt: Date
  getAggregateId(): UniqueEntityUUID
}
