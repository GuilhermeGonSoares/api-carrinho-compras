import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { City } from '../../city/entities/city.entity';

@Entity({ name: 'states' })
export class State {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, length: 2 })
  uf: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  //Relationship
  @OneToMany(() => City, (cities) => cities.state)
  cities?: City[];
}
