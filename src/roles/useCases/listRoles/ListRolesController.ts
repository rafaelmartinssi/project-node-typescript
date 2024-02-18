import { ListRolesUseCase } from './ListRolesUseCase'
import { Request, Response } from 'express'

export class ListRolesController {
  private useCase = new ListRolesUseCase()

  handle(request: Request, response: Response): Response {
    const roles = this.useCase.execute()
    return response.status(200).json(roles)
  }
}
