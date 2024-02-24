import {
  IUserRepository,
  PaginationProps,
} from '@users/repositories/IUserRepository'
import { inject, injectable } from 'tsyringe'

type UseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    page,
    limit,
  }: UseCaseParams): Promise<PaginationProps> {
    const take = limit
    const skip = (Number(page) - 1) * take
    return this.userRepository.findAll({ page, skip, take })
  }
}
