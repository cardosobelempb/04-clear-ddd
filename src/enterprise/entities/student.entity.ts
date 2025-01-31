import { Entity } from '@/shared/enterprise/entities/entity'
import { UniqueEntityUUID } from '@/shared/enterprise/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace InstructorProps {
  export interface Props {
    name: string
  }

  export interface Id {
    instructorId: UniqueEntityUUID
  }
}
export class StudentEntity extends Entity<InstructorProps.Props> {
  get name() {
    return this.props.name
  }

  static create(props: InstructorProps.Props, id?: UniqueEntityUUID) {
    const student = new StudentEntity(props, id)

    return student
  }
}
