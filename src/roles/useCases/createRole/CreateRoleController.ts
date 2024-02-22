import { CreateRoleDTO } from '@roles/entities/Role'
import { Request, Response } from 'express'
import { CreateRoleUseCase } from './CreateRoleUseCase'
import { container } from 'tsyringe'

export class CreateRoleController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const dto: CreateRoleDTO = request.body

    const roleUseCase = container.resolve(CreateRoleUseCase)

    const role = await roleUseCase.execute(dto)

    return response.status(201).json(role)
  }
}
