import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryColumn()
  id: string

  @Column()
  user_id: string

  @Column()
  token: string

  @Column()
  valid: boolean

  @Column()
  expires: Date

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
