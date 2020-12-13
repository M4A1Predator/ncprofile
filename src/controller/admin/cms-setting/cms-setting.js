
import express from 'express'
import { ConfigContainer } from '../../../config/container'
import { ServiceContainer } from '../../../service/container'
import { verifyToken } from '../../../middleware/auth-middle'

const routes = express.Router()

routes.get('/', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  const mainInfo = cmsSettingService.getMainInfo()
  console.log(mainInfo)
  res.json(mainInfo)
})

export default routes
