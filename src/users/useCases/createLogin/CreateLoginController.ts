import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateLoginUseCase } from './CreateLoginUseCase'
import { instanceToInstance } from 'class-transformer'

export class CreateLoginController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const userUseCase = container.resolve(CreateLoginUseCase)
    const { user, token } = await userUseCase.execute({
      email,
      password,
    })
    return response.status(201).json(instanceToInstance({ user, token }))
  }
}
