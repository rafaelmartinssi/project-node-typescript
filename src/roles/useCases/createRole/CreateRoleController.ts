import { Request, Response } from 'express'
import { CreateRoleUseCase } from './CreateRoleUseCase'
import { container } from 'tsyringe'

export class CreateRoleController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body

    const roleUseCase = container.resolve(CreateRoleUseCase)

    const role = await roleUseCase.execute({ name })

    return response.status(201).json(role)
  }
}
