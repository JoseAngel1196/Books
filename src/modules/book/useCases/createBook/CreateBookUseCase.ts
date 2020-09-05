import { Result, left } from '../../../../shared/core/Result';
import { AppError } from '../../../../shared/core/AppError';
import { UseCase } from '../../../../shared/core/UseCase';
import { CreateBookDTO } from './CreateBookDTO';
import { IBookRepo } from '../../repos/bookRepo';
import { Book } from '../../domain/book';
import { BookTitle } from '../../domain/bookTitle';
import { BookYear } from '../../domain/bookYear';
import { BookDescription } from '../../domain/bookDescription';

type Response = Result<AppError.UnexpectedError> | Result<any>;

export class CreateBookUseCase
  implements UseCase<CreateBookDTO, Promise<Response>> {
  private bookRepo: IBookRepo;

  /**
   *
   */
  constructor(bookRepo: IBookRepo) {
    this.bookRepo = bookRepo;
  }

  async execute(request: CreateBookDTO): Promise<Response> {
    let title: BookTitle;
    let year: BookYear;
    let bookDescription: BookDescription;

    const titleOrError = BookTitle.create({ value: request.title });
    const yearOrError = BookYear.create({ value: request.year });
    const descriptionOrError = BookDescription.create({
      value: request.bookDescription,
    });

    if (titleOrError.isFailure) {
      return Result.fail(titleOrError.error.toString());
    }

    if (yearOrError.isFailure) {
      return Result.fail(yearOrError.error.toString());
    }

    if (descriptionOrError.isFailure) {
      return Result.fail(descriptionOrError.error.toString());
    }

    try {
      title = titleOrError.getValue();
      year = yearOrError.getValue();
      bookDescription = descriptionOrError.getValue();

      const bookOrError: Result<Book> = Book.create({
        bookDescription,
        title,
        year,
      });

      if (bookOrError.isFailure) {
        return Result.fail<Book>(bookOrError.error.toString());
      }

      const book: Book = bookOrError.getValue();

      await this.bookRepo.save(book);

      return Result.ok<void>();
    } catch (err) {
      return new AppError.UnexpectedError(err);
    }
  }
}
