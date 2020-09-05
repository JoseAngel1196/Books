import { Either, Result, left, right } from '../../../../shared/core/Result';
import { UpdateBookErrors } from './UpdateBookErrors';
import { AppError } from '../../../../shared/core/AppError';
import { UpdateBookDTO } from './UpdateBookDTO';
import { UseCase } from '../../../../shared/core/UseCase';
import { IBookRepo } from '../../repos/bookRepo';
import { Book } from '../../domain/book';
import { BookTitle } from '../../domain/bookTitle';
import { BookYear } from '../../domain/bookYear';
import { BookDescription } from '../../domain/bookDescription';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

type Response = Either<
  UpdateBookErrors.BookNotFoundError | AppError.UnexpectedError | Result<void>,
  Result<any>
>;

export class UpdateBook implements UseCase<UpdateBookDTO, Promise<Response>> {
  private bookRepo: IBookRepo;

  /**
   *
   */
  constructor(bookRepo: IBookRepo) {
    this.bookRepo = bookRepo;
  }

  public async execute(request: UpdateBookDTO): Promise<Response> {
    let title: BookTitle;
    let year: BookYear;
    let bookDescription: BookDescription;
    let book: Book;

    try {
      const titleOrError = BookTitle.create({ value: request.title });
      const yearOrError = BookYear.create({ value: request.year });
      const descriptionOrError = BookDescription.create({
        value: request.bookDescription,
      });

      if (titleOrError.isFailure) {
        return left(titleOrError.error);
      }

      title = titleOrError.getValue();

      if (yearOrError.isFailure) {
        return left(yearOrError.error);
      }

      year = yearOrError.getValue();

      if (descriptionOrError.isFailure) {
        return left(descriptionOrError.error);
      }

      bookDescription = descriptionOrError.getValue();

      try {
        await this.bookRepo.getBookByBookId(request.bookId);
      } catch (err) {
        return left(new UpdateBookErrors.BookNotFoundError(request.bookId));
      }

      const bookOrError = Book.create(
        {
          bookDescription,
          title,
          year,
        },
        new UniqueEntityID(request.bookId)
      );

      if (bookOrError.isFailure) {
        return left(bookOrError);
      }

      book = bookOrError.getValue();

      await this.bookRepo.save(book);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
