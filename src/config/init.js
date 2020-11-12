import { ConfigContainer } from './container'
import { DbConfig } from './db-config'

export const initConfig = () => {
  const dbConfig = new DbConfig()
  dbConfig.init()
  ConfigContainer.init({ dbConfig })
}