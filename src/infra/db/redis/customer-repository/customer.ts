import { AddCustomerRepository } from '../../../../data/protocols/db/add-customer-repository'
import { LoadCustomerByIdRepository } from '../../../../data/protocols/db/load-by-id-customer-repository'
import { CustomerModel } from '../../../../domain/models/customer'
import { CreateCustomerModel } from '../../../../domain/usecases/add-customer'
import { uuid } from 'uuidv4'
import { RedisHelper } from '../../../helpers/redis-helper'

export class RedisCustomerRepository implements AddCustomerRepository, LoadCustomerByIdRepository {
  async add (data: CreateCustomerModel): Promise<CustomerModel> {
    const { document, name } = data
    const customer = {
      id: uuid(),
      document,
      name
    }
    const response = await RedisHelper.client.set(`customer:${customer.id}`, JSON.stringify(customer))
    if (response === 'OK') {
      return (customer)
    }
    return (Object.assign(customer, {
    }))
  }

  async loadById (id: string): Promise<CustomerModel | null> {
    const response = await RedisHelper.client.get(`customer:${id}`)
    if (!response) {
      return null
    }
    return (JSON.parse(response))
  }
}
