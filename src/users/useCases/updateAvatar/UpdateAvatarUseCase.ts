import { inject, injectable } from 'tsyringe'
import path from 'node:path'
import fs from 'node:fs'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
import { IUserRepository } from '@users/repositories/IUserRepository'
import uploadConfig from '@config/upload'

export type UpdateAvatarDTO = {
  userId: string
  avatarFilename: string
}

@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    userId,
    avatarFilename,
  }: UpdateAvatarDTO): Promise<User> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new AppError('Only authenticateded users can change avatar', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFile = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFile) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename
    return this.userRepository.update(user)
  }
}
