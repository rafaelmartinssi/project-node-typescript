import { Router } from 'express'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'
import { ListRolesController } from '@roles/useCases/listRoles/ListRolesController'

const rolesRouter = Router()
const createRolecontroller = new CreateRoleController()
const listRolescontroller = new ListRolesController()

rolesRouter.post('/', (request, response) => {
  return createRolecontroller.handle(request, response)
})

rolesRouter.get('/', (request, response) => {
  return listRolescontroller.handle(request, response)
})

export { rolesRouter }
