import * as Yup from 'yup'
import Task from '../models/Task'

class TaskController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name_task: Yup.string().required(),
      date_begin: Yup.date().required(),
      date_finish: Yup.date().required(),
      frequency: Yup.string().required(),
      description: Yup.string().required(),
      box_color: Yup.string().required(),
      text_color: Yup.string().required(),
      user_id: Yup.string().uuid().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const {
      name_task,
      date_begin,
      date_finish,
      frequency,
      description,
      box_color,
      text_color,
      user_id,
    } = request.body

    const task = await Task.create({
      name_task,
      date_begin,
      date_finish,
      frequency,
      description,
      box_color,
      text_color,
      user_id,
    })
    return response.json(task)
  }

  async update(request, response) {
    const { id } = request.params // Assuming you pass the task ID as a parameter
    const { user_id: userIdFromRequest } = request.body // Assuming user_id is sent in the request body

    // Check if the task exists
    const task = await Task.findByPk(id)
    if (!task) {
      return response.status(404).json({ error: 'Task not found' })
    }

    // Check if the user_id of the task matches the user_id of the request
    if (task.user_id !== userIdFromRequest) {
      return response
        .status(403)
        .json({ error: 'Unauthorized: You are not allowed to edit this task' })
    }

    // Proceed with updating the task
    const schema = Yup.object().shape({
      name_task: Yup.string().required(),
      date_begin: Yup.date().required(),
      date_finish: Yup.date().required(),
      frequency: Yup.string().required(),
      description: Yup.string().required(),
      box_color: Yup.string().required(),
      text_color: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const {
      name_task,
      date_begin,
      date_finish,
      frequency,
      description,
      box_color,
      text_color,
    } = request.body

    await task.update({
      name_task,
      date_begin,
      date_finish,
      frequency,
      description,
      box_color,
      text_color,
    })

    return response.json(task)
  }

  async index(request, response) {
    const { user_id } = request.body // Assuming user_id is sent in the request body

    const tasks = await Task.findAll({
      where: {
        user_id,
      },
    })
    return response.json(tasks)
  }

  /*
  async index(request, response) {
    const tasks = await Task.findAll()
    return response.json(tasks)
  } */
}

export default new TaskController()
