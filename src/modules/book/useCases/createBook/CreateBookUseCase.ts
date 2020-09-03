import { Result, left } from '../../../../shared/core/Result';
import { AppError } from '../../../../shared/core/AppError';
import { UseCase } from '../../../../shared/core/UseCase';
import { CreateBookDTO } from './CreateBookDTO';
import { IBookRepo } from '../../repos/bookRepo';
import { Book } from '../../domain/book';

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
    const { bookDescription, year, title } = request;

    try {
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
      return Result.fail(err);
    }
  }
}
