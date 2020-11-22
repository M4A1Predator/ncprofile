import express from 'express'
import path from 'path'
import routes from './routes.js'
import { initConfig } from './config/init'
import { initServices } from './service/init'

// ENV
const ENV = process.argv[0]

// init config
initConfig()
initServices()

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
