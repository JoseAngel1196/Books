import { Book } from '../domain/book';

export class BookMap {
  public static async toPersistence(book: Book): Promise<any> {
    return {
      book_id: book.bookId.id.toString(),
      title: book.title,
      year: book.year,
      book_description: book.bookDescription,
    };
  }
}
