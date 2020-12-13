
import express from 'express'
import { ConfigContainer } from '../../config/container'
import { ServiceContainer } from '../../service/container'
import { verifyToken } from '../../middleware/auth-middle'
import cmsRoutes from './cms-setting/cms-setting'
import jwt from 'jsonwebtoken'

const adminRoutes = express.Router()

adminRoutes.get('/', (req, res) => {
  // check installation
  const { dbConfig } = { ...ConfigContainer.getConfigs() }
  const db = dbConfig.db
  res.json(db.get('appSetting').value())
})

adminRoutes.get('/appConfig', (req, res) => {
  const { installationService } = { ...ServiceContainer.getServices() }
  console.log(installationService)
  res.json(installationService.getAppSetting())
})

adminRoutes.post('/install', verifyToken, (req, res) => {
  // register user
  const { username, password } = { ...req.body }
  const account = { username, password }

  const { installationService } = { ...ServiceContainer.getServices() }
  installationService.installFirst(account)
  res.json({})
})

adminRoutes.post('/token', (req, res) => {
  const { adminService } = { ...ServiceContainer.getServices() }
  const result = adminService.verifyCredential(req.body)
  if (result.error) {
    res.sendStatus(401)
    return
  }

  // issue token
  const token = jwt.sign({user: 'admin'}, 'the_secret', { expiresIn: '24H' })

  res.json({
    accessToken: token
  })
})

adminRoutes.use('/cms-setting', [cmsRoutes])

export default adminRoutes
