import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import jwtConfig from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { User } from '@users/entities/User'
import { IUserRepository } from '@users/repositories/IUserRepository'
import { IRefreshTokenRepository } from '@users/repositories/IRefreshTokenRepository'

export type CreateLoginDTO = {
  email: string
  password: string
}

export type IResponse = {
  user: User
  accessToken: string
  refreshToken: string
}

@injectable()
export class CreateLoginUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
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

    const accessToken = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    })

    const expires = new Date(Date.now() + jwtConfig.refreshToken.duration)

    const refreshToken = sign({}, jwtConfig.refreshToken.secret, {
      subject: user.id,
      expiresIn: jwtConfig.refreshToken.expiresIn,
    })

    await this.refreshTokenRepository.create({
      token: refreshToken,
      expires,
      user_id: user.id,
      valid: true,
    })

    return {
      user,
      accessToken,
      refreshToken,
    }
  }
}
