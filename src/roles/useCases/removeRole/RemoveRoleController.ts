import { Request, Response } from 'express'
import { RemoveRoleUseCase } from './RemoveRoleUseCase'
import { container } from 'tsyringe'

export class RemoveRoleController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const roleUseCase = container.resolve(RemoveRoleUseCase)

    await roleUseCase.execute(id)
    return response.status(204).send()
  }
}
