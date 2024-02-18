import { Role } from '@roles/entities/Role'
import { RoleRepository } from '@roles/repositories/RoleRepository'

export class ListRolesUseCase {
  private repository = new RoleRepository()

  execute(): Array<Role> {
    return this.repository.findAll()
  }
}
