import { Router } from 'express'
import { isAutenticated } from '@shared/http/middlewares/isAutenticated'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'
import { ListRolesController } from '@roles/useCases/listRoles/ListRolesController'
import { GetRoleController } from '@roles/useCases/getRole/GetRoleController'
import { UpdateRoleController } from '@roles/useCases/updateRole/UpdateRoleController'
import { RemoveRoleController } from '@roles/useCases/removeRole/RemoveRoleController'
import { celebrate, Joi, Segments } from 'celebrate'
import { container } from 'tsyringe'

const rolesRouter = Router()
const createRoleController = container.resolve(CreateRoleController)
const listRolesController = container.resolve(ListRolesController)
const getRoleController = container.resolve(GetRoleController)
const removeRoleController = container.resolve(RemoveRoleController)
const updateRoleController = container.resolve(UpdateRoleController)

rolesRouter.use(isAutenticated)

rolesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return createRoleController.handle(request, response)
  },
)

rolesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (request, response) => {
    return listRolesController.handle(request, response)
  },
)

rolesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return getRoleController.handle(request, response)
  },
)

rolesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return updateRoleController.handle(request, response)
  },
)

rolesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return removeRoleController.handle(request, response)
  },
)

export { rolesRouter }
