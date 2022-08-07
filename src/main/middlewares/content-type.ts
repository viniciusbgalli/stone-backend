import { Request, Response, NextFunction } from 'express'

export const defaultContentTypeMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
}
