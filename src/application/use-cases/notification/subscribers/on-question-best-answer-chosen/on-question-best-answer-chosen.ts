import { QuestionBestAnswerChosenEvent } from '@/enterprise/entities/question/events/question-best-answer-chosen.event'
import { AnswerRepository } from '@/enterprise/repositories/answer/answer.repository'
import { DomainEvents } from '@/shared/events/domain-events'
import { EventHandler } from '@/shared/events/event-handler'

import { NotificationSendUseCase } from '../../notification-send/notification-send.usecase'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly notificatioSendUseCase: NotificationSendUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendOnQuestionBestAnswerChosenNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendOnQuestionBestAnswerChosenNotification({ question, bestAnswerId }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answerRepository.findById(bestAnswerId.toString())

    if (answer) {
      this.notificatioSendUseCase.execute({
        recipientId: answer.authorId.toString(),
        title: `Sua responsta  foi a escolhica!`,
        content: `A responsta  que voçê enviou em  "${question.title.substring(0, 20).concat('...')}" foi escolhida pelo autor!`,
      })
    }
  }
}
