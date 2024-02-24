import { User } from '@users/entities/User'
import { dataSource } from '@shared/typeorm'
import {
  CreateUserDTO,
  IUserRepository,
  PaginationParams,
  PaginationProps,
} from './IUserRepository'
import { Repository } from 'typeorm'

export class UserRepository implements IUserRepository {
  private dataSource: Repository<User>

  constructor() {
    this.dataSource = dataSource.getRepository(User)
  }

  public async create({
    name,
    email,
    password,
    isAdmin,
    role,
  }: CreateUserDTO): Promise<User> {
    const user = this.dataSource.create({
      name,
      email,
      password,
      isAdmin,
      role,
    })
    return this.dataSource.save(user)
  }

  public async update(user: User): Promise<User> {
    return this.dataSource.save(user)
  }

  public async findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<PaginationProps> {
    const [users, count] = await this.dataSource
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.role', 'role')
      .skip(skip)
      .take(take)
      .getManyAndCount()

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    } as PaginationProps

    return result
  }

  public async findByName(name: string): Promise<User> {
    return this.dataSource.findOneBy({ name })
  }

  public async findByEmail(email: string): Promise<User> {
    return this.dataSource.findOneBy({ email })
  }

  public async findById(id: string): Promise<User> {
    return this.dataSource.findOneBy({ id })
  }

  public async delete(id: string): Promise<void> {
    await this.dataSource.delete(id)
  }
}
