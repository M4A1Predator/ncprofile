import { AppSetting } from '../model/app-setting'
import { AppSetting_DB_KEY } from '../model/app-setting'
import { ConfigContainer } from '../config/container'
import bcrypt from 'bcryptjs'

export default class AdminService {
  constructor() {
  }
  

  init() {

  }

  verifyCredential(cred) {
    const { dbConfig } = { ...ConfigContainer.getConfigs() }
    const db = dbConfig.db

    const appSetting = db.get('appSetting').value()

    // check username
    if (appSetting.user !== cred.username) {
      return { error: 'Invalid username' }
    }

    // check password
    if(!bcrypt.compareSync(cred.password, appSetting.password)) {
      return { error: 'Invalid password' }
    }

    return { error: '' }
  }
}
