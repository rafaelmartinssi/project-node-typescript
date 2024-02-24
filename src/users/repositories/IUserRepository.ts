import { Role } from '@roles/entities/Role'
import { User } from '@users/entities/User'

export type CreateUserDTO = {
  name: string
  email: string
  password: string
  isAdmin: boolean
  role: Role
}

export type PaginationParams = {
  page: number
  skip: number
  take: number
}

export type PaginationProps = {
  per_page: number
  total: number
  current_page: number
  data: User[]
}

export interface IUserRepository {
  create({ name, email, password, isAdmin, role }: CreateUserDTO): Promise<User>
  update(user: User): Promise<User>
  findAll({ page, skip, take }: PaginationParams): Promise<PaginationProps>
  findByName(name: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  delete(id: string): Promise<void>
}
