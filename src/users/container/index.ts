import { IUserRepository } from '@users/repositories/IUserRepository'
import { UserRepository } from '@users/repositories/UserRepository'
import { CreateLoginController } from '@users/useCases/createLogin/CreateLoginController'
import { CreateUserController } from '@users/useCases/createUser/CreateUserController'
import { ListUsersController } from '@users/useCases/listUsers/ListUsersController'
import { ShowProfileController } from '@users/useCases/showProfile/showProfileController'
import { UpdateAvatarController } from '@users/useCases/updateAvatar/UpdateAvatarContoller'
import { container } from 'tsyringe'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton('CreateUserController', CreateUserController)
container.registerSingleton('ListUsersController', ListUsersController)
container.registerSingleton('CreateLoginController', CreateLoginController)
container.registerSingleton('UpdateAvatarController', UpdateAvatarController)
container.registerSingleton('ShowProfileController', ShowProfileController)
