import { IUserRepository } from '@users/repositories/IUserRepository'
import { UserRepository } from '@users/repositories/UserRepository'
import { CreateUserUseCase } from '@users/useCases/CreateUser/CreateUserUseCase'
import { container } from 'tsyringe'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)

container.registerSingleton('CreateUserUseCase', CreateUserUseCase)
