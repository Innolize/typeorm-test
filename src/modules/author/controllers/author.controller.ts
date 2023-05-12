import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from '@modules/author/domain/author.domain';

import { BookEntity } from '@/modules/book/infrastructure/persistence/entities/book.entity';

import { AuthorEntity } from '../infrastructure/persistence/entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('author')
export class AuthorController {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  @Post()
  async create(@Body() author: CreateAuthorDto): Promise<Author> {
    const book = await this.bookRepository.findOneBy({ id: author.bookId });
    const book2 = await this.bookRepository.findOneBy({
      id: author.bookId + 1,
    });
    const book3 = await this.bookRepository.findOneBy({
      id: author.bookId + 2,
    });
    const foundAuthor = await this.authorRepository.findOneBy({
      id: 1,
    });
    foundAuthor.authorBookEntity = [
      { books: book },
      { books: book2 },
      { books: book3 },
    ];

    return await this.authorRepository.save(foundAuthor);
  }

  @Get()
  async get(): Promise<Author[]> {
    return await this.authorRepository.find({
      relations: {
        authorBookEntity: {
          books: true,
        },
      },
    });
  }
}
