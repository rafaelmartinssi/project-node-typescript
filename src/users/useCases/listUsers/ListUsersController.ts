import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListUsersUseCase } from './ListUsersUseCase'
import { instanceToInstance } from 'class-transformer'

export class ListUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const page =
      request.query.page && Number(request.query.page) > 0
        ? Number(request.query.page)
        : 1
    const limit =
      request.query.limit && Number(request.query.limit) > 0
        ? Number(request.query.limit)
        : 15

    const userUseCase = container.resolve(ListUsersUseCase)

    const users = await userUseCase.execute({ page, limit })

    return response.status(200).json(instanceToInstance(users))
  }
}
