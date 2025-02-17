import { AnswerCreatedEvent } from '@/enterprise/entities/answer/events/answer-create.event'
import { DomainEvents } from '@/shared/events/domain-events'
import { EventHandler } from '@/shared/events/event-handler'

export class OnAnswerCreated implements EventHandler {
  constructor() {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendOnAnswerCreatedNotification.bind(this), AnswerCreatedEvent.name)
  }

  private async sendOnAnswerCreatedNotification({ answer }: AnswerCreatedEvent) {
    console.log(answer)
  }
}
