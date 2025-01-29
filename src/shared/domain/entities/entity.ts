import { UniqueEnttiyUUID } from "./value-objects/unique-entity-uuid/unique-entity-uuid"

export class Entity<Props> {
  private _id: UniqueEnttiyUUID
  protected props: Props

  constructor(props: Props, id?: string) {
    this.props = props
    this._id = new UniqueEnttiyUUID(id)
  }

  get id() {
    return this._id
  }
}
