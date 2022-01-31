import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const accessToken = req.header('x-authorization')

  // verify
  jwt.verify(accessToken, 'the_secret', (err, decoded) => {
    // console.log(decoded)
    if (err) {
      res.sendStatus(401)
      return
    }
    req.user = decoded
    next()
  })
}
