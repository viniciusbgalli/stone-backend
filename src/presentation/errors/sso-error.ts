export class SSOError extends Error {
  constructor () {
    super('SSO error')
    this.name = 'SSO error'
  }
}
