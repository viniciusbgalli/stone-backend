import express from 'express'
import applyMiddlewares from './middlewares'
import applyRoutes from './routes'

const app = express()
applyMiddlewares(app)
applyRoutes(app)
export default app
