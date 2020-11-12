
import express from 'express'
import path from 'path'
import adminRoutes from './controller/admin/routes'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.get('/admin', (req, res) => {
  // res.send('Welcome Admin')
  res.sendFile(path.join(__dirname + '/../public/index.html'));
})

router.use('/api/admin', adminRoutes)

export default router;
