import { Router } from 'express'
import { RoleRepository } from '@roles/repositories/RoleRepository'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'

const rolesRouter = Router()
const repository = new RoleRepository()
const controller = new CreateRoleController()

rolesRouter.post('/', (request, response) => {
  return controller.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  const roles = repository.findAll()
  return response.status(200).json(roles)
})

export { rolesRouter }
