declare namespace Express {
  export interface Request {
    user: {
      token?: string
      clientId?: string
      role?: string[]
    }
  }
}
