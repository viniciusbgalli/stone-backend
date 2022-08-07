import { AddCustomer, CreateCustomerModel } from '../../../domain/usecases/add-customer'
import { CustomerModel } from '../../../domain/models/customer'
import { AddCustomerRepository } from '../../../data/protocols/db/add-customer-repository'

export class DbAddCustomer implements AddCustomer {
  constructor (private readonly addCustomerRepository: AddCustomerRepository) {}

  async add (data: CreateCustomerModel): Promise<CustomerModel> {
    const customer = await this.addCustomerRepository.add(data)
    return customer
  }
}
