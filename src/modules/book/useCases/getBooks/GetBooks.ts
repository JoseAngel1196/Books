import { AppError } from '../../../../shared/core/AppError';
import { Book } from '../../domain/book';
import { Result, Either, right, left } from '../../../../shared/core/Result';
import { UseCase } from '../../../../shared/core/UseCase';
import { GetBooksRequestDTO } from './GetBooksRequestDTO';
import { IBookRepo } from '../../repos/bookRepo';

type Response = Either<AppError.UnexpectedError, Result<Book[]>>;

export class GetBooks
  implements UseCase<GetBooksRequestDTO, Promise<Response>> {
  private bookRepo: IBookRepo;

  /**
   *
   */
  constructor(bookRepo: IBookRepo) {
    this.bookRepo = bookRepo;
  }

  public async execute(req: GetBooksRequestDTO): Promise<Response> {
    try {
      const books = await this.bookRepo.getBooks(req.offset);
      return right(Result.ok<Book[]>(books));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
