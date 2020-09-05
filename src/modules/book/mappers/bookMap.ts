import { Book } from '../domain/book';
import { BookDescription } from '../domain/bookDescription';
import { BookTitle } from '../domain/bookTitle';
import { BookYear } from '../domain/bookYear';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { BookDTO } from '../dtos/bookDTO';

export class BookMap {
  public static toDomain(raw: any): Book {
    const bookOrError = Book.create(
      {
        bookDescription: BookDescription.create({
          value: raw.book_description,
        }).getValue(),
        title: BookTitle.create({ value: raw.title }).getValue(),
        year: BookYear.create({ value: raw.year }).getValue(),
      },
      new UniqueEntityID(raw.book_id)
    );

    bookOrError.isFailure ? console.log(bookOrError.error) : '';

    return bookOrError.isSuccess ? bookOrError.getValue() : null;
  }

  public static toDTO(book: Book): BookDTO {
    console.log(book.bookDescription.value);
    return {
      bookDescription: book.bookDescription.value,
      title: book.title.value,
      year: book.year.value,
    };
  }

  public static async toPersistence(book: Book): Promise<any> {
    return {
      book_id: book.bookId.id.toString(),
      title: book.title.value,
      year: book.year.value,
      book_description: book.bookDescription.value,
    };
  }
}
