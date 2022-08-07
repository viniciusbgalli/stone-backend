export class CustomerNotFound extends Error {
  constructor () {
    super('Customer not found')
    this.name = 'CustomerNotFound'
  }
}
