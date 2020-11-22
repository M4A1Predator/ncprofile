
import express from 'express'
import path from 'path'
import InstallationService from '../../service/installation-service'
import { ConfigContainer } from '../../config/container'
import { ServiceContainer } from '../../service/container'

const adminRoutes = express.Router()

adminRoutes.get('/', (req, res) => {
  // check installation
  // const service = new InstallationService()

  // res.json(service.isInstalled())
  const { dbConfig } = { ...ConfigContainer.getConfigs() }
  const db = dbConfig.db
  res.json(db.get('appSetting').value())
})

adminRoutes.get('/appConfig', (req, res) => {
  // const { dbConfig } = { ...ConfigContainer.getConfigs() }
  // const db = dbConfig.db
  // res.json(db.get('appSetting').value())

  const { installationService } = { ...ServiceContainer.getServices() }
  console.log(installationService)
  res.json(installationService.getAppSetting())
})

adminRoutes.post('/install', (req, res) => {
  // register user
  
})

export default adminRoutes