import {
  createTaskLogic,
  deleteTaskLogic,
  getTaskLogic,
  getTasksLogic,
  updateTaskLogic
} from '../logic/tasks.logic.js'

export const getTasks = async (req, res) => {
  const { id } = req.user
  const { status, data } = await getTasksLogic(id)
  return res.status(status).send(data)
}

export const getTask = async (req, res) => {
  const { id } = req.params
  const { status, data } = await getTaskLogic(id)
  return res.status(status).send(data)
}

export const createTasks = async (req, res) => {
  const { title, description, date } = req.body
  const { id } = req.user
  const { status, data } = await createTaskLogic(title, description, date, id)
  return res.status(status).send(data)
}

export const updateTasks = async (req, res) => {
  const { id } = req.params
  const task = req.body
  const { status, data } = await updateTaskLogic(id, task)
  return res.status(status).send(data)
}

export const deleteTasks = async (req, res) => {
  const { id } = req.params
  const { status, data } = await deleteTaskLogic(id)
  return res.status(status).send(data)
}
