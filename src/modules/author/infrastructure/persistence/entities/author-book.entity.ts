import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BookEntity } from '@modules/book/infrastructure/persistence/entities/book.entity';

import { AuthorEntity } from './author.entity';

@Entity('author_book')
export class AuthorBookEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => BookEntity, (books) => books.authorBookEntity, {
    orphanedRowAction: 'delete',
  })
  books: BookEntity;

  @ManyToOne(() => AuthorEntity, (author) => author.authorBookEntity, {
    orphanedRowAction: 'delete',
  })
  author?: AuthorEntity;
}
