import { AppSetting, AppSetting_DB_KEY } from '../model/app-setting'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

export class DbConfig {
  constructor() {
  }

  init() {
    const ENV = process.argv[0]
    // Connect DB
    let dbFile = 'db-dev.json'
    if (ENV === 'PROD') {
      dbFile = 'db-prod.json'
    }
    const adapter = new FileSync(dbFile)
    this.db = low(adapter)
    const appSetting = new AppSetting()
    this.db.defaults({
        [AppSetting_DB_KEY]: appSetting
      })
      .write()
  }
}
// let db = undefined;

// export function initDb() {
//   const ENV = process.argv[0]
//   // Connect DB
//   let dbFile = 'db-dev.json'
//   if (ENV === 'PROD') {
//     dbFile = 'db-prod.json'
//   }
//   const adapter = new FileSync(dbFile)
//   db = low(adapter)
//   const appSetting = new AppSetting()
//   db.defaults({
//       [AppSetting_DB_KEY]: appSetting
//     })
//     .write()
//   console.log('Connectted DB ', dbFile)
// }

// export const appDb = () => db