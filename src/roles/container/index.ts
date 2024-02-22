import { IRoleRepository } from '@roles/repositories/IRoleRepository'
import { RoleRepository } from '@roles/repositories/RoleRepository'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'
import { GetRoleController } from '@roles/useCases/getRole/GetRoleController'
import { ListRolesController } from '@roles/useCases/listRoles/ListRolesController'
import { RemoveRoleController } from '@roles/useCases/removeRole/RemoveRoleController'
import { UpdateRoleController } from '@roles/useCases/updateRole/UpdateRoleController'
import { container } from 'tsyringe'

container.registerSingleton<IRoleRepository>('RoleRepository', RoleRepository)

container.registerSingleton('CreateRoleController', CreateRoleController)
container.registerSingleton('ListRolesController', ListRolesController)
container.registerSingleton('UpdateRoleController', UpdateRoleController)
container.registerSingleton('RemoveRoleController', RemoveRoleController)
container.registerSingleton('GetRoleController', GetRoleController)
