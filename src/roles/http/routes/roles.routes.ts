import { Router } from 'express'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'
import { ListRolesController } from '@roles/useCases/listRoles/ListRolesController'
import { GetRoleController } from '@roles/useCases/getRole/GetRoleController'

const rolesRouter = Router()
const createRoleController = new CreateRoleController()
const listRolesController = new ListRolesController()
const getRoleController = new GetRoleController()

rolesRouter.post('/', (request, response) => {
  return createRoleController.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  return listRolesController.handle(request, response)
})

rolesRouter.get('/:id', (request, response) => {
  return getRoleController.handle(request, response)
})

export { rolesRouter }
