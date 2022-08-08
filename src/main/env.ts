interface envProps {
  PORT: number
  REDIS_PORT: number
  REDIS_HOST: string
}

export const env: envProps = {
  PORT: Number(process.env.PORT) || 3001,
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost'
}

export const ssoProps = {
  url: process.env.URL || 'https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token',
  grant_type: process.env.GRANT_TYPE || 'client_credentials',
  client_id: process.env.CLIENT_ID || 'customers',
  client_secret: process.env.CLIENT_SECRET,
  username: process.env.USERNAME || 'vinicius.barcosg@gmail.com',
  password: process.env.PASSWORD || 'dmluaWNpdXMuYmFyY29zZ0BnbWFpbC5jb20=',
  scope: process.env.SCOPE || 'openid'
}
