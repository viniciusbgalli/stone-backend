export class AuthorizationError extends Error {
  constructor () {
    super('Client not Authorized for this action')
    this.name = 'AuthorizationError'
  }
}
