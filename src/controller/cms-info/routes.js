
import express from 'express'
import { ConfigContainer } from '../../config/container'
import { ServiceContainer } from '../../service/container'
import { verifyToken } from '../../middleware/auth-middle'
// import cmsRoutes from './cms-setting/cms-setting'
import jwt from 'jsonwebtoken'

const cmsInfoRoutes = express.Router()

cmsInfoRoutes.get('/health', (req, res) => {
  res.json({'status': 'up'})
})

cmsInfoRoutes.get('/main-info', (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  const data = cmsSettingService.getMainInfo()
  res.json(data)
})

// cmsInfoRoutes.use('/cms-setting', [cmsRoutes])

export default cmsInfoRoutes
