import { Role } from '@roles/entities/Role'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
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

  @ManyToOne(() => Role, {
    cascade: true,
  })
  role: Role

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
