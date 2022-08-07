import { CustomerModel } from '../../../domain/models/customer'

export interface LoadCustomerByIdRepository {
  loadById: (id: string) => Promise<CustomerModel | null>
}
