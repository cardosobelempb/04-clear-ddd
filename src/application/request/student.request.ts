import { UniqueEnttiyUUID } from '../../shared/domain/entities/value-objects/unique-entity-uuid/unique-entity-uuid'

export namespace StudentRequest {
  export interface Student {
    name: string
  }

  export interface Id {
    studentId: UniqueEnttiyUUID
  }
}
