import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'payment' })
@TableInheritance({ pattern: 'STI', column: { type: 'varchar', name: 'type' } })
export abstract class Payment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'status_id', nullable: false })
  statusId: number;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  discount: number;

  @Column({ nullable: false })
  final_price: number;

  @Column({ nullable: false })
  type: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
