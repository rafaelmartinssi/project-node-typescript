import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string

  @CreateDateColumn()
  created_at: Date

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  avatar?: string

  @Column()
  isAdmin: boolean

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
