import { SignInMiddleware, UserRoleAuthenticationMiddleware, RouteAdpter, makeAddCustomerController, makeLoadCustomerByIdController, makeUpdateCostumerController } from './customer-routes-import-files'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/customers', SignInMiddleware, UserRoleAuthenticationMiddleware, RouteAdpter(makeAddCustomerController()))
  router.get('/customers/:id', SignInMiddleware, UserRoleAuthenticationMiddleware, RouteAdpter(makeLoadCustomerByIdController()))
  router.put('/customers/:id', SignInMiddleware, UserRoleAuthenticationMiddleware, RouteAdpter(makeUpdateCostumerController()))
}
