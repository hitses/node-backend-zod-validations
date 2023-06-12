import Task from '../models/task.model.js'

export const getTasksLogic = async user => {
  try {
    const tasks = await Task.find({ user }).populate(
      'user',
      '_id username email'
    )
    if (!tasks) return { status: 404, data: { message: 'Tasks not found' } }

    return {
      status: 200,
      data: tasks
    }
  } catch (error) {
    return { status: 500, data: error }
  }
}

export const getTaskLogic = async id => {
  try {
    const task = await Task.findById(id).populate('user', '_id username email')
    if (!task) return { status: 404, data: { message: 'Task not found' } }

    return {
      status: 200,
      data: task
    }
  } catch (error) {
    return { status: 500, data: error }
  }
}

export const createTaskLogic = async (
  title,
  description,
  date = Date.now(),
  user
) => {
  try {
    const task = new Task({ title, description, date, user })
    const newTask = await task.save()

    return {
      status: 200,
      data: newTask
    }
  } catch (error) {
    return { status: 500, data: error }
  }
}

export const updateTaskLogic = async (id, newTask) => {
  try {
    const task = await Task.findByIdAndUpdate(id, newTask, {
      new: true
    }).populate('user', '_id username email')
    if (!task) return { status: 404, data: { message: 'Task not found' } }

    return {
      status: 200,
      data: task
    }
  } catch (error) {
    return { status: 500, data: error }
  }
}

export const deleteTaskLogic = async id => {
  try {
    const task = await Task.findByIdAndDelete(id)
    if (!task) return { status: 404, data: { message: 'Task not found' } }

    return {
      status: 200,
      data: {
        message: 'Task deleted successfully'
      }
    }
  } catch (error) {
    return { status: 500, data: error }
  }
}
