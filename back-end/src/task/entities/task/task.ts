import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../../user/entities/user/user';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 250 })
  title: string;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ default: 0 })
  index_position: number;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
