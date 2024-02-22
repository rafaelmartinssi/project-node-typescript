import { Request, Response } from 'express'
import { UpdateRoleUseCase } from './UpdateRoleUseCase'
import { container } from 'tsyringe'

export class UpdateRoleController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body

    const roleUseCase = container.resolve(UpdateRoleUseCase)

    const { id } = request.params
    const role = await roleUseCase.execute({ id, name })
    return response.status(200).json(role)
  }
}
