import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'
import { FindUserUseCase } from './FindUserUseCase'

export class UpdateAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const userUseCase = container.resolve(FindUserUseCase)
    const user = await userUseCase.execute({
      userId: request.user.id,
    })

    return response.status(200).json(instanceToInstance(user))
  }
}
