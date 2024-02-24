import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'
import { IRoleRepository } from '@roles/repositories/IRoleRepository'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
import { IUserRepository } from '@users/repositories/IUserRepository'

export type CreateUserDTO = {
  name: string
  email: string
  password: string
  isAdmin: boolean
  roleId: string
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    isAdmin,
    roleId,
  }: CreateUserDTO): Promise<User> {
    const existEmail = await this.userRepository.findByEmail(email)
    if (existEmail) {
      throw new AppError('Email addres alredy used')
    }

    const role = await this.roleRepository.findById(roleId)
    if (!role) {
      throw new AppError('Role not found', 404)
    }

    const hashedPassword = await hash(password, 10)

    return await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      role,
    })
  }
}
