import { Request, Response } from 'express'
import { Controller, HttpRequest } from './express-route-adapter-protocols'

export const RouteAdpter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers
    }
    const response = await controller.handle(httpRequest)

    return res.status(response.statusCode).json(response.body)
  }
}
