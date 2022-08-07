import { CustomerModel } from '../models/customer'

export type UpdateCustomerModel = CustomerModel

export interface UpdateCustomer {
  update: (data: UpdateCustomerModel) => Promise<CustomerModel>
}
