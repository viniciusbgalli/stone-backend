export class AuthenticationError extends Error {
  constructor () {
    super('Incorrect JTW token, not Authenticated')
    this.name = 'AuthenticationError'
  }
}
