import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transaction } from "./Transaction";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "email", type: "varchar", nullable: false })
  email: string;

  @Column({ name: "password", type: "varchar", nullable: false })
  password: string;

  @Column({ name: "avatar_url", type: "varchar", nullable: true })
  avatarUrl: string | null;

  @Column({ name: "phone", type: "varchar", nullable: true })
  phone: string | null;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime",
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "datetime",
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "datetime", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
