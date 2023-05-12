import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonModule } from '@common/common.module';

import { AuthorModule } from '@modules/author/author.module';
import { BookMysqlRepository } from '@modules/book/infrastructure/persistence/book.mysql.repository';
import { BookEntity } from '@modules/book/infrastructure/persistence/entities/book.entity';

import { BookService } from './application/service/book.service';
import { BookController } from './controllers/book.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    forwardRef(() => AuthorModule),
    CommonModule,
  ],
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: 'BOOK_REPOSITORY',
      useClass: BookMysqlRepository,
    },
  ],
  exports: [
    BookService,
    {
      provide: 'BOOK_REPOSITORY',
      useClass: BookMysqlRepository,
    },
  ],
})
export class BookModule {}
