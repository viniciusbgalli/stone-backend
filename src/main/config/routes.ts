import { Express, Router } from 'express'
import customersRoute from '../routes/consumer-routes'

export default (app: Express): void => {
  const router = Router()
  app.use('/', router)
  customersRoute(router)
}
