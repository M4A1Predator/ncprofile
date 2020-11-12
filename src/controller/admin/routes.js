
import express from 'express'
import path from 'path'
import InstallationService from '../../service/installation-service'
import { ConfigContainer } from '../../config/container'

const adminRoutes = express.Router()

adminRoutes.get('/', (req, res) => {
  // check installation
  // const service = new InstallationService()

  res.json(service.isInstalled())
  const { dbConfig } = { ...ConfigContainer.getConfigs() }
  const db = dbConfig.db
  res.json(db.get('appSetting').value())
})

adminRoutes.get('/appConfig', (req, res) => {
  // check installation
  // const service = new InstallationService()

  // res.json(service.isInstalled())
  const { dbConfig } = { ...ConfigContainer.getConfigs() }
  const db = dbConfig.db
  res.json(db.get('appSetting').value())
})

adminRoutes.post('/install', (req, res) => {
  // register user
  
})

export default adminRoutes