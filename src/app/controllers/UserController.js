import { v4 } from 'uuid'
import * as Yup from 'yup'

import User from '../models/User'

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
      admin: Yup.boolean(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, email, password, admin } = request.body

    const userExists = await User.findOne({
      where: { email },
    })
    if (userExists) {
      return response.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create({
      id: v4(),
      name,
      email,
      password,
      admin,
    })
    return response.status(201).json({ id: user.id, name, email, admin })
  }

  async update(request, response) {
    // Verifica se o usuário é administrador
    const adminUser = await User.findByPk(request.userId)

    if (!adminUser || !adminUser.admin) {
      return response.status(403).json({ error: 'Access denied' })
    }

    const schema = Yup.object().shape({
      name: Yup.string(),
      password: Yup.string().min(6),
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { name, password } = request.body
    const { userId } = request.params // Supondo que o ID do usuário a ser atualizado vem na URL

    try {
      const user = await User.findByPk(userId)
      if (!user) {
        return response.status(404).json({ error: 'User not found' })
      }

      if (name) {
        user.name = name
      }
      if (password) {
        user.password = password // Lembre-se de aplicar hash na senha antes de salvar
      }

      await user.save()
      return response.status(200).json({ message: 'User updated successfully' })
    } catch (err) {
      return response.status(500).json({ error: 'Internal server error' })
    }
  }
}

export default new UserController()
