import { CustomerModel } from '../../../domain/models/customer'
import { CreateCustomerModel } from '../../../domain/usecases/add-customer'

export interface AddCustomerRepository {
  add: (data: CreateCustomerModel) => Promise<CustomerModel>
}
