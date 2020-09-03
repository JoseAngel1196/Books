import { Book } from '../domain/book';

export interface IBookRepo {
  save(book: Book): Promise<void>;
}
