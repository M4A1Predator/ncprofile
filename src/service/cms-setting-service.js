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
    const mainInfo = this.db.get(MainInfo_DB_KEY).value()
    if (!mainInfo) {
      // init main info
      const newMainInfo = new MainInfo()
      this.db.set(MainInfo_DB_KEY, newMainInfo).write()
      return newMainInfo
    }

    return mainInfo
  }

  setMainInfo(mainInfoReq) {
    this.db.set(MainInfo_DB_KEY, mainInfoReq).write()
    const mainInfo = this.db.get(MainInfo_DB_KEY).value()
    return mainInfo
  }

  uploadFile(fileReq) {
    
    const assetPath = "asset/"
    try {
      fileReq.file.mv(assetPath + fileReq.body.name)
      return {
        status: 'success'
      }
    } catch(ex) {
      console.error(ex)
      return {
        error: 'upload failed'
      }
    }
  }
}