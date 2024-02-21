import { Router } from 'express'
import { CreateRoleController } from '@roles/useCases/createRole/CreateRoleController'
import { ListRolesController } from '@roles/useCases/listRoles/ListRolesController'
import { GetRoleController } from '@roles/useCases/getRole/GetRoleController'
import { UpdateRoleController } from '@roles/useCases/updateRole/UpdateRoleController'
import { RemoveRoleController } from '@roles/useCases/removeRole/RemoveRoleController'
import { celebrate, Joi, Segments } from 'celebrate'

const rolesRouter = Router()
const createRoleController = new CreateRoleController()
const listRolesController = new ListRolesController()
const getRoleController = new GetRoleController()
const updateRoleController = new UpdateRoleController()
const removeRoleController = new RemoveRoleController()

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
