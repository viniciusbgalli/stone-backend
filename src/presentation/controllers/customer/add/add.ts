
import { badRequest, created, MissingParamError, Controller, HttpRequest, HttpResponse, AddCustomer, cacheError } from './add-protocols'

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
      return cacheError()
    }
  }
}
