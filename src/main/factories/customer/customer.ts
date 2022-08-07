
import { RedisCustomerRepository, DbLoadByIdCustomer, DbAddCustomer, AddCustomerController, LoadCustomerByIdController } from './customer-import-files'

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
