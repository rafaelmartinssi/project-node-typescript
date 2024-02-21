import { Request, Response } from 'express'
import { RemoveRoleUseCase } from './RemoveRoleUseCase'

export class RemoveRoleController {
  private useCase = new RemoveRoleUseCase()

  public constructor() {}

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    await this.useCase.execute(id)
    return response.status(204).send()
  }
}
