import { AuthenticationError } from '../../presentation/errors/authentication-error'
import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import qs from 'qs'
import { decode } from 'jsonwebtoken'

interface SignInResponse {
  data: {access_token: string}
}

interface DecodeFormat {
  clientId: string
  resource_access: {
    customer: {roles: string[]}
  }
}

export const SignInMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const info = { grant_type: 'client_credentials', client_id: 'customers', client_secret: '453000f7-47a0-4489-bc47-891c742650e2', username: 'vinicius.barcosg@gmail.com', password: 'dmluaWNpdXMuYmFyY29zZ0BnbWFpbC5jb20=', scope: 'openid' }
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(info),
      url: 'https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token'
    }
    const { data: { access_token: token } }: SignInResponse = await axios(options)

    if (token) {
      const { clientId, resource_access: { customers: { roles: role } } }: DecodeFormat = decode(token)

      req.user = {
        clientId,
        role,
        token
      }

      return next()
    } else {
      throw new AuthenticationError()
    }
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Authentication failed' })
  }
}
