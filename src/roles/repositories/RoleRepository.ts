import { Role } from '@roles/entities/Role'
import { dataSource } from '@shared/typeorm'
import { Repository } from 'typeorm'
import {
  IRoleRepository,
  PaginationParams,
  PaginationProps,
} from '@roles/repositories/IRoleRepository'

export class RoleRepository implements IRoleRepository {
  private dataSource: Repository<Role>

  public constructor() {
    this.dataSource = dataSource.getRepository(Role)
  }

  public async create(name: string): Promise<Role> {
    const role = this.dataSource.create({ name })
    return this.dataSource.save(role)
  }

  public async update(role: Role): Promise<Role> {
    return this.dataSource.save(role)
  }

  public async delete(id: string): Promise<void> {
    await this.dataSource.delete(id)
  }

  public async findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<PaginationProps> {
    const [roles, count] = await this.dataSource
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
    return this.dataSource.findOneBy({ name })
  }

  public async findById(id: string): Promise<Role | null> {
    return this.dataSource.findOneBy({ id })
  }
}
