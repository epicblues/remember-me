import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Memo } from "./Memo";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  password!: string;

  @OneToMany(() => Memo, (memo) => memo.user)
  memos!: Memo[];
}
