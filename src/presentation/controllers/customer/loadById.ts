import { ok, notFound, serverError } from '../../../presentation/helpers/http-helper'
import { InvalidParamError } from '../../../presentation/errors/invalid-param-error'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/controllers'
import { LoadCustomer } from '../../../domain/usecases/load-customer-by-id'

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
