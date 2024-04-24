import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  year: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
