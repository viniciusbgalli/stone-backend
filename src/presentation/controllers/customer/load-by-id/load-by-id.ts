import { ok, notFound, cacheError, InvalidParamError, HttpRequest, HttpResponse, Controller, LoadCustomer, CustomerNotFound } from './load-by-id-protocols'

export class LoadCustomerByIdController implements Controller {
  constructor (private readonly loadCustomer: LoadCustomer) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const customer = await this.loadCustomer.loadById(httpRequest.params.id)
      return ok(customer)
    } catch (error) {
      if (error instanceof CustomerNotFound) {
        return notFound(new InvalidParamError('id'))
      }
      return cacheError()
    }
  }
}
