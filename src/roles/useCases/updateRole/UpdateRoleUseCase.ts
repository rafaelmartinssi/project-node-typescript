import { Role } from '@roles/entities/Role'
import { IRoleRepository } from '@roles/repositories/IRoleRepository'
import { AppError } from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'

type RoleDTO = {
  id: string
  name: string
}
@injectable()
export class UpdateRoleUseCase {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  public async execute({ id, name }: RoleDTO): Promise<Role> {
    const role = await this.roleRepository.findById(id)
    if (!role) {
      throw new AppError('Role not found', 404)
    }

    const nameExist = await this.roleRepository.findByName(name)
    if (nameExist) {
      throw new AppError('Name alredy exist')
    }

    role.name = name
    return this.roleRepository.update(role)
  }
}
