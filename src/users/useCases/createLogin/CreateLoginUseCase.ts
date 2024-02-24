import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import jwtConfig from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
import { IUserRepository } from '@users/repositories/IUserRepository'

export type CreateLoginDTO = {
  email: string
  password: string
}

export type IResponse = {
  user: User
  token: string
}

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    email,
    password,
  }: CreateLoginDTO): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordConfirmed = await compare(password, user.password)
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401)
    }
    const token = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    })
    return {
      user,
      token,
    }
  }
}
