import { Role } from '@roles/entities/Role'
import { Router } from 'express'

const rolesRouter = Router()

const roules: Array<Role> = [
  {
    uuid: 'e3b3d3a9-e768-4624-a496-a1c5bdcfb37d',
    name: 'Administrador',
    created_at: new Date(),
  },
]

rolesRouter.post('/', (request, response) => {
  const { name } = request.body
  const role = new Role(name)
  roules.push(role)
  return response.status(201).json(role)
})

rolesRouter.get('/', (request, response) => {
  return response.json({ message: 'Olá mundo' })
})

export { rolesRouter }
