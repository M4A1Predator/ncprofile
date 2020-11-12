import appDb from '../config/db-config'
import { AppSetting_DB_KEY } from '../model/app-setting'


export default class InstallationService {
  constructor(){}

  init() {

  }

  isInstalled() {
    return appDb.get(AppSetting_DB_KEY).find().value()
  }
}