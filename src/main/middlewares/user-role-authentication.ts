import { AuthorizationError } from '../../presentation/errors/authorization-error'
import { Request, Response, NextFunction } from 'express'

export const UserRoleAuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const requiredRoles: string[] = ['user']
    if (!req.user.token || !req.user.clientId) {
      throw new AuthorizationError()
    }

    if (requiredRoles.length > 0) {
      for (const role of requiredRoles) {
        if (!req.user.role?.find(userRole => userRole === role)) {
          throw new AuthorizationError()
        }
      }
    }
    return next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: 'You are not authorized to this action' })
  }
}
