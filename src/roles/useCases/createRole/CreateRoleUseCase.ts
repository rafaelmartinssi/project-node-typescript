import { CreateRoleDTO, Role } from '@roles/entities/Role'
import { RoleRepository } from '@roles/repositories/RoleRepository'
import { AppError } from '@shared/errors/AppError'

export class CreateRoleUseCase {
  private repository = RoleRepository.getInstance()

  execute(props: CreateRoleDTO): Role {
    const { name } = props

    const roleNameExists = this.repository.checkByName(name)

    if (!roleNameExists) {
      throw new AppError('property name is required')
    }

    const roleAlredyExists = this.repository.findByName(name)

    if (roleAlredyExists) {
      throw new AppError('property name already exists')
    }

    return this.repository.create(name)
  }
}
