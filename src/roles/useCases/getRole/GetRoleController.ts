import { Request, Response } from 'express'
import { GetRoleUseCase } from './GetRoleUseCase'

export class GetRoleController {
  public useCase = new GetRoleUseCase()

  public constructor() {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const role = await this.useCase.execute(id)

    return response.status(200).json(role)
  }
}
