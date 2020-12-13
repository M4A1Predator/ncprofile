import ServiceAbstract from './service-abstract'
import { ConfigContainer } from '../config/container'
import { MainInfo, MainInfo_DB_KEY } from '../model/main-info'

export default class CmsSettingService extends ServiceAbstract {
  constructor() {
    super()

    const { dbConfig } = { ...ConfigContainer.getConfigs() }
    this.db = dbConfig.db
  }

  init() {
  }

  getMainInfo() {
    const mainInfo = this.db.get('mainInfo').value()
    if (!mainInfo) {
      // init main info
      const newMainInfo = new MainInfo()
      this.db.set(MainInfo_DB_KEY, newMainInfo).write()
      return newMainInfo
    }

    return mainInfo
  }
}