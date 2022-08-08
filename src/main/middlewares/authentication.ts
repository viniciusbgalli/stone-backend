import { AuthenticationError } from '../../presentation/errors'
import { ssoProps } from '../env'
import { Request, Response, NextFunction } from 'express'
import { decode } from 'jsonwebtoken'
import axios from 'axios'
import qs from 'qs'

interface DecodeFormat {
  sub: string
  exp: number
  clientId: string
  resource_access: {
    customers: {roles: string[]}
  }
}

interface GetSSOSub {
  sub: string
}

interface SignInResponse {
  data: { access_token: string }
}

export const AuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw new AuthenticationError()
    }
    const [, token] = authHeader.split(' ')
    const { exp, clientId, sub, resource_access: { customers: { roles } } } = decode(token) as DecodeFormat
    const isExpired = verifyIfTokenIsExpired(exp)
    if (isExpired) {
      throw new AuthenticationError()
    }
    const isGeneratedBySSO = await verifyIfTokenIsGeneratedBySSO(sub)
    if (!isGeneratedBySSO) {
      throw new AuthenticationError()
    }
    req.user = {
      clientId,
      role: [...roles],
      token
    }
    return next()
  } catch (error) {
    console.log(error)
    if (error instanceof AuthenticationError) {
      return res.status(401).json({ message: 'Invalid JWT token' })
    } else {
      return res.status(502).json({ message: 'SSO unavailable' })
    }
  }
}

const verifyIfTokenIsExpired = (exp: number): boolean => {
  if (new Date() > new Date(exp * 1000)) {
    return true
  }
  return false
}

const verifyIfTokenIsGeneratedBySSO = async (subObtainedByToken: string): Promise<boolean> => {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(ssoProps),
    url: ssoProps.url
  }
  const { data: { access_token: token } } = await axios(options) as SignInResponse
  const { sub } = decode(token) as GetSSOSub
  if (sub === subObtainedByToken) {
    return true
  }
  return false
}
