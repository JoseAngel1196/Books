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

  private createBaseQuery(): any {
    const models = this.models;
    return {
      where: {},
      limit: 15,
      offset: 0,
    };
  }

  async getBooks(offset?: number): Promise<Book[]> {
    const BookModel = this.models.Book;
    const baseQuery = this.createBaseQuery();
    baseQuery.offset = offset ? offset : baseQuery.offset;
    const books = await BookModel.findAll(baseQuery);
    return books.map((b) => BookMap.toDomain(b));
  }

  async save(book: Book): Promise<void> {
    const BookModel = this.models.Book;
    const rawSequelizeBook = await BookMap.toPersistence(book);

    try {
      await BookModel.create(rawSequelizeBook);
    } catch (err) {
      throw new Error(err);
    }
  }
}
