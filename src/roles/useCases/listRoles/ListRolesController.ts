import { ListRolesUseCase } from './ListRolesUseCase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
export class ListRolesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const roleUseCase = container.resolve(ListRolesUseCase)
    const page =
      request.query.page && Number(request.query.page) > 0
        ? Number(request.query.page)
        : 1
    const limit =
      request.query.limit && Number(request.query.limit) > 0
        ? Number(request.query.limit)
        : 15
    const roles = await roleUseCase.execute({ page, limit })
    return response.status(200).json(roles)
  }
}
