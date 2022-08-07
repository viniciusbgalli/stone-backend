import { Router } from 'express'
import { makeAddCustomerController, makeLoadCustomerByIdController } from '../factories/customer'
import { RouteAdpter } from '../adapters/express-route-adapter'
import { SignInMiddleware } from '../middlewares/sign-in'
import { defaultContentTypeMiddleware } from '../middlewares/user-role-authentication'

export default (router: Router): void => {
  router.post('/customers', SignInMiddleware, defaultContentTypeMiddleware, RouteAdpter(makeAddCustomerController()))
  router.get('/customers/:id', SignInMiddleware, defaultContentTypeMiddleware, RouteAdpter(makeLoadCustomerByIdController()))
}
