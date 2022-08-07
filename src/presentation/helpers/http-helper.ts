import { ServerError, AuthenticationError, CacheError } from '../errors'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const AuthenticationFailed = (): HttpResponse => ({
  statusCode: 401,
  body: new AuthenticationError()
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error.message
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const cacheError = (): HttpResponse => ({
  statusCode: 502,
  body: new CacheError()
})
