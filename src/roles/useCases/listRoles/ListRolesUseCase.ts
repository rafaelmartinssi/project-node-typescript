import {
  IRoleRepository,
  PaginationProps,
} from '@roles/repositories/IRoleRepository'
import { injectable, inject } from 'tsyringe'

type UseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListRolesUseCase {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  async execute({ page, limit }: UseCaseParams): Promise<PaginationProps> {
    const take = limit
    const skip = (Number(page) - 1) * take
    return this.roleRepository.findAll({ page, skip, take })
  }
}
