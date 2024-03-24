import SessionController from './app/controllers/SessionController'
import TaskController from './app/controllers/TaskController'
import UserController from './app/controllers/UserController'

const { Router } = require('express')

const routes = new Router()

routes.post('/users', UserController.store)

routes.post('/sessions', SessionController.store)

routes.post('/tasks', TaskController.store)

export default routes
