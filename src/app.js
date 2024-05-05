import './database'

import cors from 'cors'
import express from 'express'
import routes from './routes'

class App {
  constructor() {
    this.app = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(
      cors({
        origin: 'http://localhost:5173', // Só permite requisições deste origin
      }),
    )
  }

  routes() {
    this.app.use(routes)
  }
}

export default new App().app
