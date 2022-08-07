import { MissingParamError } from '../../../presentation/errors/missing-param-error'
import { badRequest, created, serverError } from '../../../presentation/helpers/http-helper'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Controller } from '../../protocols/controllers'
import { AddCustomer } from '../../../domain/usecases/add-customer'

export class AddCustomerController implements Controller {
  constructor (private readonly addCustomer: AddCustomer) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['document', 'name']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { document, name } = httpRequest.body
      const customer = await this.addCustomer.add({ document, name })
      return created(customer)
    } catch (error) {
      return serverError()
    }
  }
}
