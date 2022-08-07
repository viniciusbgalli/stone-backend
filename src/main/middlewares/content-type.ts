import { Request, Response, NextFunction } from 'express'

export const DefaultContentTypeMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
}
