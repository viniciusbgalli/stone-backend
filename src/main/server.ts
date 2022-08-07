import app from './config/app'
import { RedisHelper } from '../infra/helpers/redis-helper'

RedisHelper.connect('localhost', app).catch(() => {})
