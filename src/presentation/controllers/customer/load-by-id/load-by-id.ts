import { ok, notFound, serverError, InvalidParamError, HttpRequest, HttpResponse, Controller, LoadCustomer } from './load-by-id-protocols'

export class LoadCustomerByIdController implements Controller {
  constructor (private readonly loadCustomer: LoadCustomer) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const customer = await this.loadCustomer.loadById(httpRequest.params.id)
      if (!customer) {
        return notFound(new InvalidParamError('id'))
      }
      return ok(customer)
    } catch (error) {
      return serverError()
    }
  }
}
