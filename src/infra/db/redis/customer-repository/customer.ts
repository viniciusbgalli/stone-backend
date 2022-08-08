
import { AddCustomerRepository, LoadCustomerByIdRepository, CustomerModel, CreateCustomerModel, UpdateCustomerRepository, UpdateCustomerModel, CustomerNotFound, CacheError } from './import-protocols'
import { uuid } from 'uuidv4'
import { RedisHelper } from '../../../helpers/redis-helper'

export class RedisCustomerRepository implements AddCustomerRepository, LoadCustomerByIdRepository, UpdateCustomerRepository {
  async add (data: CreateCustomerModel): Promise<CustomerModel> {
    const { document, name } = data
    const customer = {
      id: uuid(),
      document,
      name
    }
    const response = await RedisHelper.client.set(`customer:${customer.id}`, JSON.stringify(customer))
    if (!response) {
      throw new CacheError()
    }
    return (customer)
  }

  async loadById (id: string): Promise<CustomerModel> {
    const response = await RedisHelper.client.get(`customer:${id}`)
    if (!response) {
      throw new CustomerNotFound()
    }
    return (JSON.parse(response))
  }

  async update (data: UpdateCustomerModel): Promise<CustomerModel> {
    const { id, document, name } = data
    const response = await RedisHelper.client.get(`customer:${id}`)
    if (!response) {
      throw new CustomerNotFound()
    }

    await RedisHelper.client.del(`customer:${id}`)

    const updatedCustomer = {
      id,
      document,
      name
    }

    const updatedResponse = await RedisHelper.client.set(`customer:${id}`, JSON.stringify(updatedCustomer))

    if (!updatedResponse) {
      throw new CacheError()
    }

    return (updatedCustomer)
  }
}
