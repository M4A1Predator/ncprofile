import ServiceAbstract from './service-abstract'
import { ConfigContainer } from '../config/container'
import { MainInfo, MainInfo_DB_KEY, mainInfoSchema } from '../model/main-info'
import { NavbarInfo, navbarReqSchema } from '../model/navbar-info'
import { WebElm } from '../model/web-elm'
import { DB_WEB_ELMS } from '../constants/db-keys'
import { WEB_ELM_TYPES, MAIN_BANNER, FOOTER } from '../constants/default-web-elm'
import fs from 'fs'
import jsonschema from 'jsonschema'

const assetPath = "asset/"

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
    // validate req
    const v = new jsonschema.Validator()
    // v.addSchema(mainInfoSchema)
    const validateResult = v.validate(mainInfoReq, mainInfoSchema)
    if (validateResult.errors.length) {
      console.error(validateResult.errors)
      return {
        err: validateResult.errors
      }
    }

    // extract main info and others
    const navbarReq = mainInfoReq.navbar
    delete mainInfoReq['navbar']

    // save main info
    this.db.set(MainInfo_DB_KEY, mainInfoReq).write()

    // save navbar
    const setNavErr = this._setNavBar(navbarReq)
    if (setNavErr) {
      console.error("Save navbar failed")
      return {
        err: validateResult.errors
      }
    }

    // return new data
    const mainInfo = this.db.get(MainInfo_DB_KEY).value()
    return mainInfo
  }

  updateWebEml(webElmReq) {
    // validation
    if ((webElmReq.name == MAIN_BANNER || webElmReq.name == FOOTER) && 
          webElmReq.type !== WEB_ELM_TYPES.JSON) {
        return {
          err: "Invalid web element type"
        }
    }
  
    // prepare to save web elm
    const webElm = new WebElm()
    webElm.name = webElmReq.name
    webElm.data = webElmReq.data
    webElm.type = webElmReq.type
    webElm.meta = webElmReq.meta

    // validate data
    // -------------

    // prepare db
    const webElmsDbSize = this.db.get(DB_WEB_ELMS).size().value()
    if (!webElmsDbSize) {
      this.db.set(DB_WEB_ELMS, []).write()
    }

    // upsert web elm
    const webElmDb = this.db.get(DB_WEB_ELMS).find({
      name: webElm.name
    })

    if (webElmDb.value()) {
      webElmDb.assign(webElm).write()
    } else {
      this.db.get(DB_WEB_ELMS).push(webElm).write()
    }
  }

  getWebElm() {
    return this.db.get(DB_WEB_ELMS).value()
  }

  updateWebPage() {
    
  }

  uploadFile(fileReq) {
    
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

  getAssetList() {

    return new Promise((resolve, reject) => {
      fs.readdir(assetPath, (err, files) => {
        const assetList = []
        files.forEach((f) => {
          assetList.push({
            path: f,
            isDir: fs.lstatSync(assetPath + f).isDirectory()
          })
        })
        resolve(assetList)
      })
    })

  }

  getFile() {
    
  }

  _setNavBar(navbarReq) {
    // verify data
    const v = new jsonschema.Validator()
    const validateResult = v.validate(navbarReq, navbarReqSchema)
    if (validateResult.errors.length) {
      console.error(validateResult.errors)
      return validateResult.errors
    }

    // save
    const navbarData = new NavbarInfo()
    navbarData.data = navbarReq
    this.db.set(`${MainInfo_DB_KEY}.navbar`, navbarData).write()
  }
}