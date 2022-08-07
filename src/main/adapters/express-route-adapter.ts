import { Request, Response } from 'express'
import { HttpRequest } from '../../presentation/protocols/http'
import { Controller } from '../../presentation/protocols/controllers'

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
