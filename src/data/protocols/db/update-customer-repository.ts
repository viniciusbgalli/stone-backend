import { CustomerModel } from '../../../domain/models/customer'
import { UpdateCustomerModel } from '../../../domain/usecases/update-customer'

export interface UpdateCustomerRepository {
  update: (data: UpdateCustomerModel) => Promise<CustomerModel>
}
