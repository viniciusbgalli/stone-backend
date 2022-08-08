import { AuthenticationMiddleware, NormalUserRoleMiddleware, RouteAdpter, makeAddCustomerController, makeLoadCustomerByIdController, makeUpdateCostumerController } from './customer-routes-import-files'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/customers', AuthenticationMiddleware, NormalUserRoleMiddleware, RouteAdpter(makeAddCustomerController()))
  router.get('/customers/:id', AuthenticationMiddleware, NormalUserRoleMiddleware, RouteAdpter(makeLoadCustomerByIdController()))
  router.put('/customers/:id', AuthenticationMiddleware, NormalUserRoleMiddleware, RouteAdpter(makeUpdateCostumerController()))
}
