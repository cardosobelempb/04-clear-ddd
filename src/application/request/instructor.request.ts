import { UniqueEnttiyUUID } from '../../shared/domain/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace InstructorRequest {
  export interface Instructor {
    name: string
  }

  export interface Id {
    instructorId: UniqueEnttiyUUID
  }
}
