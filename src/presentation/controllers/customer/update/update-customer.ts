import { badRequest, ok, cacheError, HttpRequest, HttpResponse, Controller, UpdateCustomer, MissingParamError, CustomerNotFound, notFound, InvalidParamError } from './update-customer-protocols'

export class UpdateCostumerController implements Controller {
  constructor (private readonly updateCustomer: UpdateCustomer) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const bodyRequiredFields = ['document', 'name']
      for (const field of bodyRequiredFields) {
        if (!httpRequest?.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const paramsRequiredFields = ['id']
      for (const field of paramsRequiredFields) {
        if (!httpRequest?.params[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { document, name } = httpRequest.body
      const { id } = httpRequest.params
      const customer = await this.updateCustomer.update({ id, document, name })
      return ok(customer)
    } catch (error) {
      if (error instanceof CustomerNotFound) {
        return notFound(new InvalidParamError('customer id'))
      }
      return cacheError()
    }
  }
}
