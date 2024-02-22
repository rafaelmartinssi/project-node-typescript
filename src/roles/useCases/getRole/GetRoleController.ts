import { Request, Response } from 'express'
import { GetRoleUseCase } from './GetRoleUseCase'
import { container } from 'tsyringe'

export class GetRoleController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const roleUseCase = container.resolve(GetRoleUseCase)

    const role = await roleUseCase.execute(id)

    return response.status(200).json(role)
  }
}
