import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AuthorBookEntity } from '@/modules/author/infrastructure/persistence/entities/author-book.entity';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  format: string;

  @OneToMany(
    () => AuthorBookEntity,
    (authorBookEntity) => authorBookEntity.books,
    { cascade: true },
  )
  authorBookEntity?: AuthorBookEntity[];
}
