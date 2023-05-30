import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'city_id', nullable: false })
  cityId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  //Relationship
  @ManyToOne(() => User, (user) => user.adresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @ManyToOne(() => City, (city) => city.addresses)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city?: City;
}
