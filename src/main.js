import express from 'express'
import path from 'path'
import routes from './routes.js'
import { initConfig } from './config/init'
import { initServices } from './service/init'
import cors from 'cors'
import bodyParser from 'body-parser'

// ENV
const ENV = process.argv[0]

// init config
initConfig()
initServices()

// Set up server Config
const port = 9300
const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// static file
app.use('/static', express.static(path.join(__dirname, '/../public')))

// set up routes
app.use('/', routes)


// start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
