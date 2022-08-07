
import { UpdateCustomer, CustomerModel, UpdateCustomerModel, UpdateCustomerRepository } from './db-update-customer-protocols'

export class DbUpdateCustomer implements UpdateCustomer {
  constructor (private readonly updateCustomerRepository: UpdateCustomerRepository) {}

  async update (data: UpdateCustomerModel): Promise<CustomerModel> {
    const customer = await this.updateCustomerRepository.update(data)
    return customer
  }
}
