import { Role } from '@roles/entities/Role'
import { RoleRepository } from '@roles/repositories/RoleRepository'
import { AppError } from '@shared/errors/AppError'

type RoleDTO = {
  id: string
  name: string
}

export class UpdateRoleUseCase {
  private repository = RoleRepository.getInstance()

  public constructor() {}

  public async execute({ id, name }: RoleDTO): Promise<Role> {
    const role = await this.repository.findById(id)
    if (!role) {
      throw new AppError('Role not found', 404)
    }

    const nameExist = await this.repository.findByName(name)
    if (nameExist) {
      throw new AppError('Name alredy exist')
    }

    role.name = name
    return this.repository.update(role)
  }
}
