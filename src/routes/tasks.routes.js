import { Router } from 'express'
import { validateToken } from '../middlewares/validateToken.js'
import {
  getTasks,
  getTask,
  createTasks,
  updateTasks,
  deleteTasks
} from '../controllers/tasks.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createTaskSchema } from '../schemas/task.schema.js'

const router = Router()

router.get('/', validateToken, getTasks)
router.get('/:id', validateToken, getTask)
router.post('/', validateToken, validateSchema(createTaskSchema), createTasks)
router.put('/:id', validateToken, updateTasks)
router.delete('/:id', validateToken, deleteTasks)

export default router
