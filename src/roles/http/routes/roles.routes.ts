import { Router } from 'express'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'
import { ListRolesController } from '@roles/useCases/listRoles/ListRolesController'
import { GetRoleController } from '@roles/useCases/getRole/GetRoleController'
import { UpdateRoleController } from '@roles/useCases/updateRole/UpdateRoleController'
import { RemoveRoleController } from '@roles/useCases/removeRole/RemoveRoleController'

const rolesRouter = Router()
const createRoleController = new CreateRoleController()
const listRolesController = new ListRolesController()
const getRoleController = new GetRoleController()
const updateRoleController = new UpdateRoleController()
const removeRoleController = new RemoveRoleController()

rolesRouter.post('/', (request, response) => {
  return createRoleController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  return listRolesController.handle(request, response)
})

rolesRouter.get('/:id', (request, response) => {
  return getRoleController.handle(request, response)
})

rolesRouter.put('/:id', (request, response) => {
  return updateRoleController.handle(request, response)
})

rolesRouter.delete('/:id', (request, response) => {
  return removeRoleController.handle(request, response)
})

export { rolesRouter }
