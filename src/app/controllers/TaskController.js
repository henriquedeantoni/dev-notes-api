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
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.satus(400).json({ error: err.errors })
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

    const task = await Task.create({
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
    const tasks = await Task.findAll()

    return response.json(tasks)
  }
}

export default new TaskController()
