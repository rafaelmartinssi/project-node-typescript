import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'
import { CreateAccessAndRefreshTokenUseCase } from './CreateAccessAndRefreshTokenUseCase'

export class CreateAccessAndRefreshTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { refresh_token } = request.body
    const accessAndRefreshTokenUseCase = container.resolve(
      CreateAccessAndRefreshTokenUseCase,
    )
    const { user, accessToken, refreshToken } =
      await accessAndRefreshTokenUseCase.execute({
        user_id,
        refresh_token,
      })
    return response
      .status(201)
      .json(instanceToInstance({ user, accessToken, refreshToken }))
  }
}
