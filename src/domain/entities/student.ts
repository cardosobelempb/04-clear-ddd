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
export class Student extends Entity<InstructorProps.Props> {
  static create(props: InstructorProps.Props, id?: UniqueEnttiyUUID) {
    const student = new Student(props, id)

    return student
  }
}
