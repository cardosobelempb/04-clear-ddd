import { Entity } from '../../shared/domain/entities/entity'
import { UniqueEnttiyUUID } from '../../shared/domain/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace InstructorProps {
  export interface Props {
    name: string
  }

  export interface Id {
    instructorId: UniqueEnttiyUUID
  }
}

export class Instructor extends Entity<InstructorProps.Props> {
  static create(props: InstructorProps.Props, id?: UniqueEnttiyUUID) {
    const instructor = new Instructor(props, id)

    return instructor
  }
}
