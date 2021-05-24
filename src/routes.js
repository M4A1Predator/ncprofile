
import express from 'express'
import path from 'path'
import adminRoutes from './controller/admin/routes'
import cmsInfoRoutes from './controller/cms-info/routes'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

// ==================== serve Admin UI ==============================
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
//==========================================================

// Admin API
router.use('/api/admin', adminRoutes)

// Serve public UI
router.get('/*.*', express.static(__dirname + '/../../asset'))

// Public API
router.use('/api', cmsInfoRoutes)


export default router;
