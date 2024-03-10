import { RefreshToken } from '@users/entities/RefreshToken'
import {
  CreateRefreshTokenDTO,
  IRefreshTokenRepository,
} from './IRefreshTokenRepository'
import { Repository } from 'typeorm'
import { dataSource } from '@shared/typeorm'
import { AppError } from '@shared/errors/AppError'

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private dataSource: Repository<RefreshToken>

  constructor() {
    this.dataSource = dataSource.getRepository(RefreshToken)
  }

  public async create({
    user_id,
    token,
    expires,
    valid,
  }: CreateRefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = this.dataSource.create({
      user_id,
      token,
      expires,
      valid,
    })

    return this.dataSource.save(refreshToken)
  }

  public async findByToken(token: string): Promise<RefreshToken> {
    return this.dataSource.findOneBy({ token })
  }

  public async invalidate(refresh_token: RefreshToken): Promise<void> {
    const refreshToken = await this.findByToken(refresh_token.token)

    if (!refreshToken) {
      throw new AppError('Refresh Token not found', 404)
    }

    refreshToken.valid = false

    await this.dataSource.save(refreshToken)
  }
}
