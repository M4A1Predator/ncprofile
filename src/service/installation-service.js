import { AppSetting } from '../model/app-setting'
import { AppSetting_DB_KEY } from '../model/app-setting'
import { ConfigContainer } from '../config/container'
import bcrypt from 'bcryptjs'


export default class InstallationService {
  constructor(){}

  init() {

  }

  getAppSetting() {
    const { dbConfig } = { ...ConfigContainer.getConfigs() }
    const db = dbConfig.db
    return db.get('appSetting').value()
  }

  installFirst(data) {
    const { dbConfig } = { ...ConfigContainer.getConfigs() }
    const db = dbConfig.db

    const { username, password } = { ...data }
    // encrypt password
    bcrypt.genSalt(10)
    const hashPassword = bcrypt.hashSync(password, salt);

    // save basic setting
    const appSetting = new AppSetting()
    appSetting.isInstalled = true
    appSetting.user = username
    appSetting.password = hashPassword
    db.set(AppSetting_DB_KEY, appSetting).write()
  }
}