import { CustomerModel } from '../models/customer'

export type CreateCustomerModel = Omit<CustomerModel, 'id'>

export interface AddCustomer {
  add: (data: CreateCustomerModel) => Promise<CreateCustomerModel>
}
