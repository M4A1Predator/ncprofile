
import express from 'express'
import path from 'path'
import adminRoutes from './controller/admin/routes'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname + '/../admin/index.html'))
})

router.get('/admin/*', (req, res) => {
  let reqPath = req.path
  reqPath = reqPath.slice("/admin".length)
  if (reqPath[0] === '/') {
    reqPath = reqPath.slice(1)
  }
  res.sendFile(path.join(__dirname + `/../admin/${reqPath}`))
})

router.use('/api/admin', adminRoutes)

export default router;
