import { Book } from '../domain/book';

export interface IBookRepo {
  getBooks(offset?: number): Promise<Book[]>;
  save(book: Book): Promise<void>;
}
