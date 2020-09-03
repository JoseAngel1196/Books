import { IBookRepo } from '../bookRepo';
import { Book } from '../../domain/book';
import { BookMap } from '../../mappers/bookMap';

export class SequelizeBookRepo implements IBookRepo {
  private models: any;

  /**
   *
   */
  constructor(models: any) {
    this.models = models;
  }

  async save(book: Book): Promise<void> {
    const BookModel = this.models.Book;
    const rawSequelizeBook = await BookMap.toPersistence(book);
    await BookModel.create(rawSequelizeBook);
  }
}
