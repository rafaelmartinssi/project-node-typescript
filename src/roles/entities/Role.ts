import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('roles')
export class Role {
  @PrimaryColumn()
  id: string
  @CreateDateColumn()
  created_at: Date
  @Column()
  name: string

  constructor(name: string) {
    this.name = name
    this.id = uuidv4()
    this.created_at = new Date()
  }
}
