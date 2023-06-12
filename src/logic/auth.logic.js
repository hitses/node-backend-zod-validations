import { createAccessToken } from '../libs/jwt.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const registerLogic = async (username, email, password) => {
  try {
    const encriptedPass = await bcrypt.hash(password, 10)

    const user = new User({ username, email, password: encriptedPass })
    const newUser = await user.save()

    const token = await createAccessToken({ id: newUser._id })

    return {
      status: 200,
      token,
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        timestamp: {
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt
        }
      }
    }
  } catch (error) {
    if (error.code === 11000) {
      return { status: 400, data: { errors: ['Email already exists'] } }
    }
    return { status: 500, data: { errors: error } }
  }
}

export const loginLogic = async (email, password) => {
  try {
    const user = await User.findOne({ email })

    if (!user) return { status: 404, data: 'User not found' }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) return { status: 400, data: 'Invalid credentials' }

    const token = await createAccessToken({ id: user._id })

    return {
      status: 200,
      token,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        timestamp: {
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    }
  } catch (error) {
    return { status: 500, data: error }
  }
}

export const profileLogic = async id => {
  try {
    const user = await User.findById(id)

    if (!user) return { status: 404, data: 'User not found' }

    return {
      status: 200,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        timestamp: {
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    }
  } catch (error) {
    return { status: 500, data: error }
  }
}
