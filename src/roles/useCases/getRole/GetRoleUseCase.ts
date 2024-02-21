import { Role } from '@roles/entities/Role'
import { RoleRepository } from '@roles/repositories/RoleRepository'
import { AppError } from '@shared/errors/AppError'

export class GetRoleUseCase {
  private repository = RoleRepository.getInstance()

  public constructor() {}

  public async execute(id: string): Promise<Role> {
    const role = await this.repository.findById(id)

    if (!role) {
      throw new AppError('Role not found', 404)
    }

    return role
  }
}
