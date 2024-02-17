import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'

const rolesRouter = Router()

const roules: any = [
  {
    uuid: 'e3b3d3a9-e768-4624-a496-a1c5bdcfb37d',
    name: 'Administrador',
    created_at: '2024-02-17T23:44:29.425Z',
  },
]

rolesRouter.post('/', (request, response) => {
  const { name } = request.body
  const role = {
    uuid: uuidv4(),
    name,
    created_at: new Date(),
  }
  roules.push(role)
  return response.status(201).json(role)
})

rolesRouter.get('/', (request, response) => {
  return response.json({ message: 'Olá mundo' })
})

export { rolesRouter }
