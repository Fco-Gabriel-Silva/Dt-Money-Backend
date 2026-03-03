import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Transaction } from "./Transaction";
import { User } from "./User";

@Entity("transaction_categories")
export class TransactionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @Column({ name: "color", type: "varchar", nullable: true })
  color?: string;

  // nullable: true porque as categorias padrão (do seeder) não tem dono
  @Column({ name: "user_id", type: "int", nullable: true })
  userId?: number;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime",
    nullable: false, // Pode usar default: "CURRENT_TIMESTAMP" dependendo da sua config
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "datetime",
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: "deleted_at",
    type: "datetime",
    nullable: true,
  })
  deletedAt?: Date | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user?: User;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions?: Transaction[];
}
