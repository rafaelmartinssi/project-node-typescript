import { v4 as uuidv4 } from 'uuid'

export class Role {
  id: string
  created_at: Date
  name: string

  constructor(name: string) {
    this.name = name
    this.id = uuidv4()
    this.created_at = new Date()
  }
}

export type CreateRoleDTO = {
  name: string
}
