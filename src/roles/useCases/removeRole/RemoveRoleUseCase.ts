import { RoleRepository } from '@roles/repositories/RoleRepository'
import { AppError } from '@shared/errors/AppError'

export class RemoveRoleUseCase {
  private repository = RoleRepository.getInstance()

  public constructor() {}

  public async execute(id: string): Promise<void> {
    const role = await this.repository.findById(id)
    if (!role) {
      throw new AppError('Role not found', 404)
    }
    await this.repository.delete(id)
  }
}
