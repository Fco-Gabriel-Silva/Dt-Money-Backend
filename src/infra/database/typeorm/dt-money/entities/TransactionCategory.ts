import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user?: User;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions?: Transaction[];
}
