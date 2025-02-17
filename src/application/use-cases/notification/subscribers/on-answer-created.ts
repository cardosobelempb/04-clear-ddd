import { AnswerCreatedEvent } from '@/enterprise/entities/answer/events/answer-create.event'
import { QuestionRepository } from '@/enterprise/repositories/question/question.repository'
import { DomainEvents } from '@/shared/events/domain-events'
import { EventHandler } from '@/shared/events/event-handler'

import { NotificationSendUseCase } from '../notification-send/notification-send.usecase'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly notificatioSendUseCase: NotificationSendUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.sendOnAnswerCreatedNotification.bind(this), AnswerCreatedEvent.name)
  }

  private async sendOnAnswerCreatedNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionRepository.findById(answer.questionId.toString())

    if (question) {
      this.notificatioSendUseCase.execute({
        recipientId: question.authorId.toString(),
        title: `Nova resposta em ${question.title.substring(0, 40).concat('...')}`,
        content: answer.exerpt,
      })
    }
  }
}
