import { inject, injectable } from 'tsyringe'
import { compare, hash } from 'bcryptjs'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
import { IUserRepository } from '@users/repositories/IUserRepository'

export type UpdateProfileDTO = {
  userId: string
  name: string
  email: string
  password?: string
  old_password?: string
}

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    old_password,
  }: UpdateProfileDTO): Promise<User> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userCheckEmail = await this.userRepository.findByEmail(email)
    if (userCheckEmail && userCheckEmail.id !== userId) {
      throw new AppError('Email addres alredy used')
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)
      if (!checkOldPassword) {
        throw new AppError('Old password does not match')
      }
      user.password = await hash(password, 10)
    }

    user.name = name
    user.email = email

    return await this.userRepository.update(user)
  }
}
