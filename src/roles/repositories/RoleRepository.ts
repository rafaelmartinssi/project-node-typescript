import { Role } from '@roles/entities/Role'
import { dataSource } from '@shared/typeorm'
import { Repository } from 'typeorm'
import {
  IRoleRepository,
  PaginationParams,
  PaginationProps,
} from '@roles/repositories/IRoleRepository'

export class RoleRepository implements IRoleRepository {
  private repository: Repository<Role>

  public constructor() {
    this.repository = dataSource.getRepository(Role)
  }

  public async create(name: string): Promise<Role> {
    const role = this.repository.create({ name })
    console.log(role)
    return this.repository.save(role)
  }

  public async update(role: Role): Promise<Role> {
    return this.repository.save(role)
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  public async findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<PaginationProps> {
    const [roles, count] = await this.repository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount()

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: roles,
    } as PaginationProps

    return result
  }

  public async findByName(name: string): Promise<Role | null> {
    return this.repository.findOneBy({ name })
  }

  public async findById(id: string): Promise<Role | null> {
    return this.repository.findOneBy({ id })
  }
}
