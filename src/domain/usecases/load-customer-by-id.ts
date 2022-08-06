import { Client } from '../models/Client'

export interface LoadClient {
  loadById: (id: string) => Promise<Client>
}
