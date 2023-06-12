import { loginLogic, profileLogic, registerLogic } from '../logic/auth.logic.js'

export const register = async (req, res) => {
  const { username, email, password } = req.body
  const { status, token, data } = await registerLogic(username, email, password)
  return res.status(status).cookie('token', token).send(data)
}

export const login = async (req, res) => {
  const { email, password } = req.body
  const { status, token, data } = await loginLogic(email, password)
  return res.status(status).cookie('token', token).send(data)
}

export const logout = async (_req, res) => {
  return res
    .status(200)
    .cookie('token', '', {
      expires: new Date(0)
    })
    .send({ data: 'Logged out' })
}

export const profile = async (req, res) => {
  const { id } = req.user
  const { status, data } = await profileLogic(id)
  return res.status(status).send(data)
}
