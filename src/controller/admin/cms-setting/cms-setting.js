
import express from 'express'
import { ConfigContainer } from '../../../config/container'
import { ServiceContainer } from '../../../service/container'
import { verifyToken } from '../../../middleware/auth-middle'
import jsonschema from 'jsonschema'

const routes = express.Router()

routes.get('/', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  const mainInfo = cmsSettingService.getMainInfo()
  res.json(mainInfo)
})

routes.post('/', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  const mainInfo = cmsSettingService.setMainInfo(req.body)
  res.json(mainInfo)
})

routes.post('/file', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  const fileReq = {
    body: req.body,
    file: req.files.file
  }
  const result = cmsSettingService.uploadFile(fileReq)
  if (result.error) {
    res.status(500, result)
  }
  res.json(result)
})

routes.get('/files', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  cmsSettingService.getAssetList().then(data => {
    res.json(data)
  })

})

export default routes
