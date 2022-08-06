import { CustomerModel } from '../models/customer'

export type UpdateCustomerModel = CustomerModel

export interface UpdateCustomer {
  loadById: (data: UpdateCustomerModel) => Promise<CustomerModel>
}
