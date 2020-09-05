import { IBookRepo } from '../bookRepo';
import { Book } from '../../domain/book';
import { BookMap } from '../../mappers/bookMap';
import { BookId } from '../../domain/bookId';

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

  async exists(bookId: BookId): Promise<boolean> {
    const BookModel = this.models.Book;
    const baseQuery = this.createBaseQuery();
    baseQuery.where['book_id'] = bookId.id.toString();
    const book = await BookModel.findOne(baseQuery);
    const found = !!book === true;
    return found;
  }

  async getBooks(offset?: number): Promise<Book[]> {
    const BookModel = this.models.Book;
    const baseQuery = this.createBaseQuery();
    baseQuery.offset = offset ? offset : baseQuery.offset;
    const books = await BookModel.findAll(baseQuery);
    return books.map((b) => BookMap.toDomain(b));
  }

  async getBookByBookId(bookId: BookId | string): Promise<Book> {
    bookId = bookId instanceof BookId ? bookId.id.toString() : bookId;
    const BookModel = await this.models.Book;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where['book_id'] = bookId;
    const book = await BookModel.findOne(detailsQuery);
    const found = !!book === true;
    if (!found) throw new Error('Book not found');
    return BookMap.toDomain(book);
  }

  async save(book: Book): Promise<void> {
    const BookModel = this.models.Book;
    const exists = await this.exists(book.bookId);
    const isNewBook = !exists;
    const rawSequelizeBook = await BookMap.toPersistence(book);

    if (isNewBook) {
      try {
        await BookModel.create(rawSequelizeBook);
      } catch (err) {
        throw new Error(err);
      }
    } else {
      try {
        await BookModel.update(rawSequelizeBook, {
          where: { book_id: book.bookId.id.toString() },
        });
      } catch (err) {
        throw new Error(err);
      }
    }
  }
}
