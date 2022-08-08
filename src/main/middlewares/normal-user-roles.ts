import { AuthenticationError } from '../../presentation/errors'
import { Request, Response, NextFunction } from 'express'

export const NormalUserRoleMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const requiredRoles: string[] = ['user']
    if (requiredRoles.length > 0) {
      for (const role of requiredRoles) {
        if (!req.user.role?.find(userRole => userRole === role)) {
          throw new AuthenticationError()
        }
      }
    }
    next()
  } catch (err) {
    if (err instanceof AuthenticationError) { return res.status(403).json({ message: err.message }) }
    return res.status(500).json({ message: 'Internal server error' })
  }
}
