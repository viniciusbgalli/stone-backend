
import { LoadCustomer, CustomerModel, LoadCustomerByIdRepository } from './db-load-by-id-customer-protocols'

export class DbLoadByIdCustomer implements LoadCustomer {
  constructor (private readonly loadCustumerByIdRepository: LoadCustomerByIdRepository) {}

  async loadById (id: string): Promise<CustomerModel | null> {
    const customer = await this.loadCustumerByIdRepository.loadById(id)
    return customer
  }
}
