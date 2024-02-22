import { CreateRoleDTO, Role } from '@roles/entities/Role'
import { IRoleRepository } from '@roles/repositories/IRoleRepository'
import { AppError } from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject('RoleRepository')
    private roleRepository: IRoleRepository,
  ) {}

  public checkByName(name?: string): boolean {
    return name && name !== ''
  }

  public async execute(props: CreateRoleDTO): Promise<Role> {
    const { name } = props

    const roleNameExists = this.checkByName(name)

    if (!roleNameExists) {
      throw new AppError('property name is required')
    }

    const roleAlredyExists = await this.roleRepository.findByName(name)

    if (roleAlredyExists) {
      throw new AppError('property name already exists')
    }

    return await this.roleRepository.create(name)
  }
}
