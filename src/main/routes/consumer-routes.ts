import { DefaultContentTypeMiddleware, SignInMiddleware, RouteAdpter, makeAddCustomerController, makeLoadCustomerByIdController } from './customer-routes-import-files'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/customers', SignInMiddleware, DefaultContentTypeMiddleware, RouteAdpter(makeAddCustomerController()))
  router.get('/customers/:id', SignInMiddleware, SignInMiddleware, RouteAdpter(makeLoadCustomerByIdController()))
}
