import {
  PaginationProps,
  RoleRepository,
} from '@roles/repositories/RoleRepository'

type UseCaseParams = {
  page: number
  limit: number
}

export class ListRolesUseCase {
  private repository = RoleRepository.getInstance()

  async execute({ page, limit }: UseCaseParams): Promise<PaginationProps> {
    const take = limit
    const skip = (Number(page) - 1) * take
    return this.repository.findAll({ page, skip, take })
  }
}
