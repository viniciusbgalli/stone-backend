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
  } catch (error) {
    console.log(error)
    if (error instanceof AuthenticationError) { return res.status(403).json({ message: 'Not authorized' }) } else {
      return res.status(502).json({ message: 'SSO unavailable' })
    }
  }
}
