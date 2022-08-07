import Redis from 'ioredis'
import { Express } from 'express'

export const RedisHelper = {
  client: null as Redis,

  async connect (uri: string, app: Express): Promise<void> {
    this.client = new Redis(6379, uri)

    this.client.on(
      'connect', () => {
        console.log('Connected to Redis')
      })

    this.client.on('ready', () => {
      console.log('Redis ready to operate')
      app.listen(3333, () => { console.log('server listening') })
    })

    this.client.on('error', function (e) {
      console.log(`Error to connect to Redis: ${e}`)
    })
  }

}
