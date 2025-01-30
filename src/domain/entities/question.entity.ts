import dayjs from 'dayjs'
import { Entity } from '../../shared/domain/entities/entity'
import { Slug } from '../../shared/domain/entities/value-objects/slug/slug'
import { UniqueEntityUUID } from '../../shared/domain/entities/value-objects/unique-entity-uuid/unique-entity-uuid'
import { Optional } from '../../shared/domain/types/optional'

export namespace QuestionProps {
  export interface Props {
    authorId: UniqueEntityUUID
    bestAnswerId?: UniqueEntityUUID
    title: string
    content: string
    slug: Slug
    createdAt: Date
    updatedAt?: Date
  }

  export interface Id {
    questionId: UniqueEntityUUID
  }
}

export class QuestionEntity extends Entity<QuestionProps.Props> {
  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  set bestAnswerId(bestAnswerId: UniqueEntityUUID | undefined) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug ?? Slug.createFromText(title)
    this.touch()
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get updatedAt() {
    return this.props.createdAt
  }

  get updatedAto() {
    return this.props.createdAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.updatedAt, 'day') <= 3
  }

  get exerpt() {
    return this.content.substring(0, 120).trim().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(
    props: Optional<QuestionProps.Props, 'createdAt' | 'slug'>,
    id?: UniqueEntityUUID,
  ) {
    const question = new QuestionEntity(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
