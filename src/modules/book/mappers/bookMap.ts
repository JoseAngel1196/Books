import { Book } from '../domain/book';

export class BookMap {
  public static async toPersistence(book: Book): Promise<any> {
    return {
      book_id: book.bookId.id.toString(),
      title: book.title.value,
      year: book.year.value,
      book_description: book.bookDescription.value,
    };
  }
}
