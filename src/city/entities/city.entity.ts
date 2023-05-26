import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Address } from '../../address/entities/address.entity';
import { State } from '../../state/entities/state.entity';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relationship
  @OneToMany(() => Address, (address) => address.city)
  addresses: Address[];

  @ManyToOne(() => State, (state) => state.cities)
  state: State;
}
