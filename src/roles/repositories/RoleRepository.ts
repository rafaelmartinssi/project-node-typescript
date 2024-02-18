import { Role } from '@roles/entities/Role'

export class RoleRepository {
  private roles: Role[] = [
    {
      uuid: 'e3b3d3a9-e768-4624-a496-a1c5bdcfb37d',
      name: 'Administrador',
      created_at: new Date(),
    },
  ]

  public create(name: string): Role {
    const role = new Role(name)
    this.roles.push(role)
    return role
  }

  public findAll(): Array<Role> {
    return this.roles
  }

  public findByName(name: string): boolean {
    return this.roles.some(element => element.name === name)
  }

  public checkByName(name?: string): boolean {
    return name && name !== ''
  }
}
