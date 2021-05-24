
import express from 'express'
import { ConfigContainer } from '../../../config/container'
import { ServiceContainer } from '../../../service/container'
import { verifyToken } from '../../../middleware/auth-middle'
import { webEmlReqSchema, webEmlSchema } from '../../../model/web-elm'
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

routes.post('/elm', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }

  // validation
  if (!req.body || !req.body.length) {
    res.json({"err": "Body is required"})
    return;
  }

  const v = new jsonschema.Validator();
  v.addSchema(webEmlSchema)
  const validateResult = v.validate(req.body, webEmlReqSchema)
  if (validateResult.errors.length) {
    res.json({
      err: validateResult.errors
    })
    return;
  }
  const errs = []
  req.body.forEach(body => {
    const err = cmsSettingService.updateWebEml(body);
    if (err) {
      errs.add(err)
    }
  })
  
  res.json(errs.length ? {err: errs} : { updated: "success" })
})

routes.post('/elm-meta', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  res.json({})
})

routes.get('/elm', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  res.json(cmsSettingService.getWebElm())
})

export default routes
