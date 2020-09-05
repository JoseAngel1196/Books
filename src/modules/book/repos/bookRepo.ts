import { Book } from '../domain/book';
import { BookId } from '../domain/bookId';

export interface IBookRepo {
  exists(bookId: BookId): Promise<boolean>;
  getBooks(offset?: number): Promise<Book[]>;
  getBookByBookId(bookId: BookId | string): Promise<Book>;
  save(book: Book): Promise<void>;
}
