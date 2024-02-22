import { Role } from '@roles/entities/Role'

export interface IRoleRepository {
  create(name: string): Promise<Role>
  update(role: Role): Promise<Role>
  findAll(params: PaginationParams): Promise<PaginationProps>
  findByName(name: string): Promise<Role | null>
  findById(id: string): Promise<Role | null>
  delete(id: string): Promise<void>
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
  data: Role[]
}
