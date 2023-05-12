import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AuthorBookEntity } from './author-book.entity';

@Entity('author')
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({
    default: 'active',
  })
  status: string;

  @OneToMany(
    () => AuthorBookEntity,
    (authorBookEntity) => authorBookEntity.author,
    { cascade: true },
  )
  authorBookEntity?: AuthorBookEntity[];
}
