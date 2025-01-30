import { UniqueEnttiyUUID } from './value-objects/unique-entity-uuid/unique-entity-uuid'

export class Entity<Props> {
  private _id: UniqueEnttiyUUID
  protected props: Props

  protected constructor(props: Props, id?: UniqueEnttiyUUID) {
    this.props = props
    this._id = id ?? new UniqueEnttiyUUID(id)
  }

  get id() {
    return this._id
  }
}
