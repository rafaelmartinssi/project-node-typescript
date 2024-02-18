import { v4 as uuidv4 } from 'uuid'

export class Role {
  uuid: string
  created_at: Date
  name: string

  constructor(name: string) {
    this.name = name
    this.uuid = uuidv4()
    this.created_at = new Date()
  }
}

export type CreateRoleDTO = {
  name: string
}
