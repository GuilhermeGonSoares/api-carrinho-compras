import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { City } from '../../city/entities/city.entity';

@Entity({ name: 'adresses' })
export class Address {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: false })
  numberAddress: number;

  @Column({ nullable: false })
  cep: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  //Relationship
  @ManyToOne(() => User, (user) => user.adresses)
  user: User;

  @ManyToOne(() => City, (city) => city.addresses)
  city: City;
}
