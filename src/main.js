import express from 'express'
import path from 'path'
import routes from './routes.js'
import { initConfig } from './config/init'

// ENV
const ENV = process.argv[0]

// Connect DB
// let dbFile = 'db-dev.json'
// if (ENV === 'PROD') {
//   dbFile = 'db-prod.json'
// }
// const adapter = new FileSync(dbFile)
// const db = low(adapter)
// const appSetting = new AppSetting()
// db.defaults({
//     [AppSetting_DB_KEY]: appSetting
//   })
//   .write()
initConfig()

// Set up server Config
const port = 9300
const app = express();

// static file
app.use('/static', express.static(path.join(__dirname, '/../public')))

// set up routes
app.use('/', routes)


// start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
