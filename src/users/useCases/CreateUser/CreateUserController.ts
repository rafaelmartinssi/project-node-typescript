import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUserUseCase'
import { instanceToInstance } from 'class-transformer'

export class CreateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, isAdmin, roleId } = request.body
    const userUseCase = container.resolve(CreateUserUseCase)
    const user = await userUseCase.execute({
      name,
      email,
      password,
      isAdmin,
      roleId,
    })
    return response.status(201).json(instanceToInstance(user))
  }
}
