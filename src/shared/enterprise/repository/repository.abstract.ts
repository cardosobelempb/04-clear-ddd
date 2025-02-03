import { Pagination } from './types/pagination'

export abstract class RepositoryAbstract<T> {
  abstract findById(id: string): Promise<T | null>
  abstract findMany(params: Pagination.Params): Promise<T[]>
  abstract create(entity: T): Promise<void>
  abstract update(entity: T): Promise<void>
  abstract delete(entity: T): Promise<void>
}
