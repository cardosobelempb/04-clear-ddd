import { ServiceError } from './service-erro.interface'

export class NotAllowedErro extends Error implements ServiceError {
  constructor() {
    super('Not allowed')
  }
}
