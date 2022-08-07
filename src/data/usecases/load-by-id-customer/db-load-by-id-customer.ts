import { LoadCustomer } from '../../../domain/usecases/load-customer-by-id'
import { CustomerModel } from '../../../domain/models/customer'
import { LoadCustomerByIdRepository } from '../../../data/protocols/db/load-by-id-customer-repository'

export class DbLoadByIdCustomer implements LoadCustomer {
  constructor (private readonly loadCustumerByIdRepository: LoadCustomerByIdRepository) {}

  async loadById (id: string): Promise<CustomerModel | null> {
    const customer = await this.loadCustumerByIdRepository.loadById(id)
    return customer
  }
}
