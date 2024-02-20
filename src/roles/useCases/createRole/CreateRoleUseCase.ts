import { CreateRoleDTO, Role } from '@roles/entities/Role'
import { RoleRepository } from '@roles/repositories/RoleRepository'
import { AppError } from '@shared/errors/AppError'

export class CreateRoleUseCase {
  private repository = RoleRepository.getInstance()

  public checkByName(name?: string): boolean {
    return name && name !== ''
  }

  public async execute(props: CreateRoleDTO): Promise<Role> {
    const { name } = props

    const roleNameExists = this.checkByName(name)

    if (!roleNameExists) {
      throw new AppError('property name is required')
    }

    const roleAlredyExists = await this.repository.findByName(name)

    if (roleAlredyExists) {
      throw new AppError('property name already exists')
    }

    return await this.repository.create(name)
  }
}
