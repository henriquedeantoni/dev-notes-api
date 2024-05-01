import SessionController from './app/controllers/SessionController'
import TaskController from './app/controllers/TaskController'
import UserController from './app/controllers/UserController'

import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'
import ReminderController from './app/controllers/ReminderController'

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.post('/tasks', TaskController.store)

routes.get('/tasks', TaskController.index)

routes.put('/tasks/:id', TaskController.update)

routes.post('/reminders', ReminderController.store)

routes.get('/reminders', ReminderController.index)

export default routes
