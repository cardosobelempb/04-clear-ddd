import { ServiceError } from './service-erro.interface'

export class ResourceNotFoundErro extends Error implements ServiceError {
  constructor() {
    super('Resouce not found')
  }
}
