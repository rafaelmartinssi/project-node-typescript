import { AppError } from '@shared/errors/AppError'
import { Router } from 'express'
import { RoleRepository } from '@roles/repositories/RoleRepository'

const rolesRouter = Router()
const repository = new RoleRepository()

rolesRouter.post('/', (request, response) => {
  const { name } = request.body

  if (!name || name === '') {
    throw new AppError('property name is required')
  }

  const role = repository.create(name)

  return response.status(201).json(role)
})

rolesRouter.get('/', (request, response) => {
  const roles = repository.findAll()
  return response.status(200).json(roles)
})

export { rolesRouter }
