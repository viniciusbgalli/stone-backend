
import { RedisCustomerRepository, DbLoadByIdCustomer, DbAddCustomer, AddCustomerController, LoadCustomerByIdController, UpdateCostumerController, DbUpdateCustomer } from './customer-import-files'

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

export const makeUpdateCostumerController = (): UpdateCostumerController => {
  const redisCustomerRepository = new RedisCustomerRepository()
  const dbUpdateCustomer = new DbUpdateCustomer(redisCustomerRepository)
  const updateCostumerController = new UpdateCostumerController(dbUpdateCustomer)
  return updateCostumerController
}
