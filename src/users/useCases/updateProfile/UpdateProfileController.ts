import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'
import { UpdateProfileUseCase } from './UpdateProfileUseCase'

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body
    const userUseCase = container.resolve(UpdateProfileUseCase)
    const user = await userUseCase.execute({
      userId: request.user.id,
      name,
      email,
      password,
      old_password,
    })
    return response.status(201).json(instanceToInstance(user))
  }
}
