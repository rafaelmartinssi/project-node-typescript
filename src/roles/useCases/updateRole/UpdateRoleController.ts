import { Request, Response } from 'express'
import { UpdateRoleUseCase } from './UpdateRoleUseCase'

export class UpdateRoleController {
  private useCase = new UpdateRoleUseCase()

  public constructor() {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body
    const { id } = request.params
    const role = await this.useCase.execute({ id, name })
    return response.status(200).json(role)
  }
}
