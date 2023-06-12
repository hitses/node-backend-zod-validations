import jwt from 'jsonwebtoken'
import { SECRET_TOKEN } from '../config.js'

export const validateToken = async (req, res, next) => {
  try {
    const { token } = req.cookies

    if (!token) return res.status(401).send({ data: 'Unauthorized' })

    jwt.verify(token, SECRET_TOKEN.secret, (err, user) => {
      console.log(err)
      if (err) return res.status(401).send({ data: 'Unauthorized' })

      req.user = user

      next()
    })
  } catch (error) {
    return res.status(500).send({ data: error })
  }
}
