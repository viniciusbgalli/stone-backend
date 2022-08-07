export class CacheError extends Error {
  constructor () {
    super('Cache error')
    this.name = 'Cache error'
  }
}
