import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateAvatarUseCase } from './UpdateAvatarUseCase'
import { instanceToInstance } from 'class-transformer'

export class UpdateAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const userUseCase = container.resolve(UpdateAvatarUseCase)
    const user = await userUseCase.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename,
    })

    return response.status(200).json(instanceToInstance(user))
  }
}
