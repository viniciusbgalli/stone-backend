
import { AddCustomer, CreateCustomerModel, CustomerModel, AddCustomerRepository } from './db-add-customer-protocols'

export class DbAddCustomer implements AddCustomer {
  constructor (private readonly addCustomerRepository: AddCustomerRepository) {}

  async add (data: CreateCustomerModel): Promise<CustomerModel> {
    const customer = await this.addCustomerRepository.add(data)
    return customer
  }
}
