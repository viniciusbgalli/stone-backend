import { Express } from 'express'
import { bodyParserMiddleware } from '../middlewares/body-parser'
import { corsMiddleware } from '../middlewares/cors'
import { defaultContentTypeMiddleware } from '../middlewares/content-type'

export default (app: Express): void => {
  app.use(bodyParserMiddleware)
  app.use(corsMiddleware)
  app.use(defaultContentTypeMiddleware)
}
