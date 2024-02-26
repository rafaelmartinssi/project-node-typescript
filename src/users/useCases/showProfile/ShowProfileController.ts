import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'
import { ShowProfileUseCase } from './ShowProfileUseCase'

export class ShowProfileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const userUseCase = container.resolve(ShowProfileUseCase)
    const user = await userUseCase.execute({
      userId: request.user.id,
    })

    return response.status(200).json(instanceToInstance(user))
  }
}
