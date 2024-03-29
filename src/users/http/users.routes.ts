import { Router } from 'express'
import { container } from 'tsyringe'
import multer from 'multer'
import { Joi, Segments, celebrate } from 'celebrate'
import { CreateLoginController } from '@users/useCases/createLogin/CreateLoginController'
import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { ListUsersController } from '@users/useCases/listUsers/ListUsersController'
import { isAutenticated } from '@shared/http/middlewares/isAutenticated'
import { UpdateAvatarController } from '@users/useCases/updateAvatar/UpdateAvatarContoller'
import { ShowProfileController } from '@users/useCases/showProfile/ShowProfileController'
import uploadConfig from '@config/upload'
import { UpdateProfileController } from '@users/useCases/updateProfile/UpdateProfileController'
import { CreateAccessAndRefreshTokenController } from '@users/useCases/createAccessAndRefreshToken/CreateAccessAndRefreshTokenController'
import { addUserInfoToRequest } from '@users/http/middlewares/addUserInfoToRequest'

const usersRouter = Router()
const createUserController = container.resolve(CreateUserController)
const listUserController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)
const updateAvatarController = container.resolve(UpdateAvatarController)
const showProfileController = container.resolve(ShowProfileController)
const updateProfileController = container.resolve(UpdateProfileController)
const createAccessAndRefreshTokenController = container.resolve(
  CreateAccessAndRefreshTokenController,
)

const upload = multer(uploadConfig)

usersRouter.post(
  '/',
  isAutenticated,
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

usersRouter.put(
  '/profile',
  isAutenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    }),
  }),
  (request, response) => {
    return updateProfileController.handle(request, response)
  },
)

usersRouter.get(
  '/',
  isAutenticated,
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

usersRouter.get('/profile', isAutenticated, (request, response) => {
  return showProfileController.handle(request, response)
})

usersRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return createLoginController.handle(request, response)
  },
)

usersRouter.post(
  '/refresh_token',
  addUserInfoToRequest,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      refresh_token: Joi.string().required(),
    }),
  }),
  (request, response) => {
    return createAccessAndRefreshTokenController.handle(request, response)
  },
)

usersRouter.patch(
  '/avatar',
  isAutenticated,
  upload.single('avatar'),
  (request, response) => {
    return updateAvatarController.handle(request, response)
  },
)

export { usersRouter }
