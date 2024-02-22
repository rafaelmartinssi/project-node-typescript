import { IRoleRepository } from '@roles/repositories/IRoleRepository'
import { AppError } from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
@injectable()
export class RemoveRoleUseCase {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const role = await this.roleRepository.findById(id)
    if (!role) {
      throw new AppError('Role not found', 404)
    }
    await this.roleRepository.delete(id)
  }
}
