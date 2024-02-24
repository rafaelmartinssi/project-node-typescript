import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { ListUsersController } from '@users/useCases/listUsers/ListUsersController'
import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { container } from 'tsyringe'

const usersRouter = Router()
const createUserController = container.resolve(CreateUserController)
const listUserController = container.resolve(ListUsersController)

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
      roleId: Joi.string().uuid().required(),
    }),
  }),
  (request, response) => {
    return createUserController.handle(request, response)
  },
)

usersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (request, response) => {
    return listUserController.handle(request, response)
  },
)

export { usersRouter }
