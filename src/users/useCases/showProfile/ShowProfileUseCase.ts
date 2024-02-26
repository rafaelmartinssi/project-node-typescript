import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
import { IUserRepository } from '@users/repositories/IUserRepository'

export type FindUserParams = {
  userId: string
}

@injectable()
export class ShowProfileUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ userId }: FindUserParams): Promise<User> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    return user
  }
}
