import { Role } from '@roles/entities/Role'

export class RoleRepository {
  private roules: Role[] = [
    {
      uuid: 'e3b3d3a9-e768-4624-a496-a1c5bdcfb37d',
      name: 'Administrador',
      created_at: new Date(),
    },
  ]

  public create(name: string) {
    const role = new Role(name)
    this.roules.push(role)
    return role
  }
}
