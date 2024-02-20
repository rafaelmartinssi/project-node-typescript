import { CreateRoleDTO } from '@roles/entities/Role'
import { Request, Response } from 'express'
import { CreateRoleUseCase } from './CreateRoleUseCase'

export class CreateRoleController {
  private useCase = new CreateRoleUseCase()

  public async handle(request: Request, response: Response): Promise<Response> {
    const dto: CreateRoleDTO = request.body

    const role = await this.useCase.execute(dto)

    return response.status(201).json(role)
  }
}
