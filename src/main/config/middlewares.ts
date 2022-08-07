import { BodyParserMiddleware, CorsMiddleware, DefaultContentTypeMiddleware } from '../middlewares'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(BodyParserMiddleware)
  app.use(CorsMiddleware)
  app.use(DefaultContentTypeMiddleware)
}
