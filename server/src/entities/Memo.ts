import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

const TITLE_MAX_LENGTH = 200;
const CONTENT_MAX_LENGTH = 1000;

@Entity()
export class Memo extends BaseEntity {
  static TITLE_MAX_LENGTH = TITLE_MAX_LENGTH;
  static CONTENT_MAX_LENGTH = CONTENT_MAX_LENGTH;

  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Column({ type: "varchar", length: TITLE_MAX_LENGTH })
  title!: string;

  @Column({ type: "varchar", length: CONTENT_MAX_LENGTH })
  content!: string;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: ["remove"],
    nullable: false,
  })
  author!: User;

  @Column({ default: 0, unsigned: true })
  count!: number;

  @Column({ nullable: false, unsigned: true })
  authorId!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
