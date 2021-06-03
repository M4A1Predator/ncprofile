
import express from 'express'
import path from 'path'
import adminRoutes from './controller/admin/routes'
import cmsInfoRoutes from './controller/cms-info/routes'
import { APP_SERVER } from '../../dist/ncprofileweb/server/main.js'

const router = express.Router()

// router.get('/', (req, res) => {
//   res.send('Hello World!')
// })

router.get('/static/*', (req, res) => {
  let reqPath = req.path
  reqPath = reqPath.slice("/static".length)
  if (reqPath[0] === '/') {
    reqPath = reqPath.slice(1)
  }
  res.sendFile(path.join(__dirname + `/../../asset/${reqPath}`))
})

// ==================== serve Admin ==============================
// static file
router.get('/admin/*.*', (req, res) => {
  let reqPath = req.path
  reqPath = reqPath.slice("/admin".length)
  if (reqPath[0] === '/') {
    reqPath = reqPath.slice(1)
  }
  
  // serve static file
  res.sendFile(path.join(__dirname + `/../admin/${reqPath}`), (err) => {
    // get to admin uri
    // res.sendFile(path.join(__dirname + '/../admin/index.html'))
  })
  
})

// admin index
router.get('/admin*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../admin/index.html'))
  // res.render('index')
})

// router.get('/admin/*.*', express.static('../admin', {
//   maxAge: '1y'
// }));

// Admin API
router.use('/api/admin', adminRoutes)
//==========================================================

//==========================PUBLIC==========================

// static files
// router.use('/*.*', express.static(__dirname + '/../../ncprofileweb/browser'))
router.get('/*.*', (req, res) => {
  let reqPath = req.path
  if (reqPath[0] === '/') {
    reqPath = reqPath.slice(1)
  }
  res.sendFile(path.join(__dirname + `/../ncprofileweb/browser/${reqPath}`))
})

// Public API
router.use('/api', cmsInfoRoutes)

// web UI
router.use('/', APP_SERVER)


export default router;
