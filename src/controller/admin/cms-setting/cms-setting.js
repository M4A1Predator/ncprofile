
import express from 'express'
import { ServiceContainer } from '../../../service/container'
import { verifyToken } from '../../../middleware/auth-middle'
import { webEmlReqSchema, webEmlSchema } from '../../../model/web-elm'
import jsonschema from 'jsonschema'
import { ReqModel } from '../../../model/req-model'
import { ResModel } from '../../../model/res-model'
import { WebMessage, webMessageSchema } from '../../../model/language-message'

const routes = express.Router()

routes.get('/', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  const mainInfo = cmsSettingService.getMainInfo()
  res.json(mainInfo)
})

/**
 * Update maininfo
 */
routes.post('/', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }

  const mainInfoReq = new ReqModel()
  mainInfoReq.body = req.body
  const mainInfoRes = new ResModel()

  const result = cmsSettingService.setMainInfo(mainInfoReq, mainInfoRes)
  const setMainInfoRes = result.mainInfoRes
  if (setMainInfoRes.errors && setMainInfoRes.errors.length) {
    res.status(400).json(setMainInfoRes.errors)
    return
  }
  res.json(setMainInfoRes.data)
})

/*
 * Upload file
 */
routes.post('/files', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  const fileReq = {
    body: req.body,
    file: req.files.file
  }

  // validate file name
  let re = new RegExp(/^(.*\s+.*)+$/);
  if (re.test(fileReq.file.name)) {
    res.status(400).json({ 'error': 'File name must not contains whitespace' })
    return
  }

  const result = cmsSettingService.uploadFile(fileReq)
  if (result.error) {
    res.status(500, result)
  }
  res.json(result)
})

/*
 * Get files list / File
 */
routes.get('/files', verifyToken, async (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  if (req.query && req.query.path) {
    // get specific file
    try{
      const content = await cmsSettingService.getFile(req.query.path)
      res.writeHead(200,{'Content-type':'image/jpg'});
      res.end(content);
    } catch(err) {
      console.error("Can't get file")
      res.status(500).body({"error": "can't get file"})
    }
    return
  }

  cmsSettingService.getAssetList().then(data => {
    res.json(data)
  })
})

/*
 * Add element
 */
routes.post('/elm', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }

  // validation req
  if (!req.body || !req.body.length) {
    res.json({"err": "Body is required"})
    return;
  }

  // validate schema
  const v = new jsonschema.Validator();
  v.addSchema(webEmlSchema)
  const validateResult = v.validate(req.body, webEmlReqSchema)
  if (validateResult.errors.length) {
    res.json({
      err: validateResult.errors
    })
    return;
  }

  // update web elements
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
  // const { cmsSettingService } = { ...ServiceContainer.getServices() }
  const reqModel = new ReqModel()
  // TODO elm-meta feature
  reqModel.body = req.body
  res.json({})
})

/*
 * Get elements
 */
routes.get('/elm', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  const filter = {
    name: req.query.name
  }
  const data = cmsSettingService.getWebElm(filter)
  if (data === undefined) {
    res.status(404).json({"message": "Not found"})
    return
  }
  res.json(data)
})

routes.post('/main-content-pics', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }

  // validate body
  if (!req.body || (!req.body.logoPath && !req.body.faviconPath)) {
    res.status(400).json({ "message": "logoPath or faviconPath is required" })
  }

  const err = cmsSettingService.updateMainPics(req.body)
  if (err) {
    res.status(400, err)
  } else {
    res.json({})
  }
})

/*
 * Get webpages
 */
routes.get('/pages', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  res.json(cmsSettingService.getWebPages())
})

/*
 * Create new webpage
 */
routes.post('/pages', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  const err = cmsSettingService.createWebPage(req.body)
  if (err) {
    res.status(400).json(err)
  } else {
    res.status(201).json({})
  }
})

/*
 * Update webpage
 */
routes.put('/pages', verifyToken, (req, res) => {
  const { cmsSettingService } = { ...ServiceContainer.getServices() }
  const result = cmsSettingService.updateWebPage(req.body)
  if (result.err) {
    res.status(500).json(result.err)
    return
  }

  res.json(result)
})

/*
 * Get languages
 */
routes.get('/langs', verifyToken, (req, res) => {
  const { translatorService } = { ...ServiceContainer.getServices() }
  res.json(translatorService.getLanguages())
})

/*
 * Add language
 */
routes.post('/langs', verifyToken, (req, res) => {

  // validate schema
  if (!req.body || !req.body.name || !req.body.name.trim()) {
    res.status(400).json({ err: "name is required" })
    return
  }

  // update language
  const { translatorService } = { ...ServiceContainer.getServices() }
  const lang = translatorService.addLanguage(req.body)
  res.json(lang)
})

/*
 * Get messages
 */
routes.get('/langs/:langName/messages', verifyToken, (req, res) => {
  const { translatorService } = { ...ServiceContainer.getServices() }
  const lang = translatorService.getMessages(req.params.langName)
  if (!lang) {
    res.status(404).type({ "message" : `${req.params.langName} not found` })
  }
  res.json(lang)
})

/*
 * Add message
 */
routes.post('/langs/:langName/messages', verifyToken, (req, res) => {
  // validate schema
  const v = new jsonschema.Validator();
  v.addSchema(webMessageSchema)
  const validateResult = v.validate(req.body, webMessageSchema)
  if (validateResult.errors.length) {
    res.json({
      err: validateResult.errors
    })
    return;
  }

  // update messages data
  const { translatorService } = { ...ServiceContainer.getServices() }
  const webMessage = new WebMessage()
  webMessage.instance(req.body)
  console.log(webMessage)
  translatorService.updateMessage(req.params.langName, webMessage)
  res.json({ "message" : "updated" })
})

export default routes
