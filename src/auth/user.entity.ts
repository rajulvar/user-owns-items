import { Item } from '../list-items/item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((_type) => Item, (item) => item.user, { eager: true })
  item: Item[];
}
