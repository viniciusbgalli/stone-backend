import { CustomerModel } from '../models/customer'

export interface LoadCustomer {
  loadById: (id: string) => Promise<CustomerModel>
}
