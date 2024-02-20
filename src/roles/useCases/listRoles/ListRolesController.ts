import { ListRolesUseCase } from './ListRolesUseCase'
import { Request, Response } from 'express'

export class ListRolesController {
  private useCase = new ListRolesUseCase()

  async handle(request: Request, response: Response): Promise<Response> {
    const page =
      request.query.page && Number(request.query.page) > 0
        ? Number(request.query.page)
        : 1
    const limit =
      request.query.limit && Number(request.query.limit) > 0
        ? Number(request.query.limit)
        : 15
    const roles = await this.useCase.execute({ page, limit })
    return response.status(200).json(roles)
  }
}
