import { env } from '../../main/env'
import Redis from 'ioredis'
import { Express } from 'express'

export const RedisHelper = {
  // @ts-expect-error
  client: null as Redis,

  async connect (uri: string, app: Express): Promise<void> {
    this.client = new Redis(env.REDIS_PORT, env.REDIS_HOST)

    this.client.on(
      'connect', () => {
        console.log('Connected to Redis')
      })

    this.client.on('ready', () => {
      console.log('Redis ready to operate')
      app.listen(env.PORT, () => { console.log(`server listening on port ${env.PORT}`) })
    })

    this.client.on('error', function (e) {
      console.log(`Error to connect to Redis: ${e}`)
    })
  }

}
