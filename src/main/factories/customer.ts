import { AddCustomerController } from '../../presentation/controllers/customer/add'
import { LoadCustomerByIdController } from '../../presentation/controllers/customer/loadById'
import { DbAddCustomer } from '../../data/usecases/add-customer/db-add-customer'
import { DbLoadByIdCustomer } from '../../data/usecases/load-by-id-customer/db-load-by-id-customer'
import { RedisCustomerRepository } from '../../infra/db/redis/customer-repository/customer'

export const makeAddCustomerController = (): AddCustomerController => {
  const redisCustomerRepository = new RedisCustomerRepository()
  const dbAddCustomer = new DbAddCustomer(redisCustomerRepository)
  const addCustomerController = new AddCustomerController(dbAddCustomer)
  return addCustomerController
}

export const makeLoadCustomerByIdController = (): LoadCustomerByIdController => {
  const redisCustomerRepository = new RedisCustomerRepository()
  const dbLoadByIdCustomer = new DbLoadByIdCustomer(redisCustomerRepository)
  const loadCustomerByIdController = new LoadCustomerByIdController(dbLoadByIdCustomer)
  return loadCustomerByIdController
}
