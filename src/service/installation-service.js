import { AppSetting } from '../model/app-setting'
import { AppSetting_DB_KEY } from '../model/app-setting'
import { ConfigContainer } from '../config/container'
import { WebElm } from '../model/web-elm'
import { DB_WEB_ELMS } from '../constants/db-keys'
import { WEB_ELM_TYPES, MAIN_BANNER, FOOTER } from '../constants/default-web-elm'
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
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt);

    // save basic setting
    const appSetting = new AppSetting()
    appSetting.isInstalled = true
    appSetting.user = username
    appSetting.password = hashPassword
    db.set(AppSetting_DB_KEY, appSetting).write()

    // save basic data
    const mainBanner = new WebElm()
    mainBanner.data = {
      "text": "Power of Lightweight"
    }
    mainBanner.name = MAIN_BANNER
    mainBanner.type = WEB_ELM_TYPES.JSON
    mainBanner.isNative = true
    db.set(DB_WEB_ELMS, [mainBanner]).write()

    const footer = new WebElm()
    footer.name = FOOTER
    footer.data = {
      text: "Copyright 2021",
      menus: [{
        name: "Contact",
        subMenus : [
          {
            order: 1,
            name: "Sales",
            link: "/sales"
          },
          {
            order: 2,
            name: "Office",
            link: "/office"
          }
        ]
      }]
    }
    mainBanner.type = WEB_ELM_TYPES.JSON
    footer.isNative = true
  }
}