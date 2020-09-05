import { UseCaseError } from '../../../../shared/core/UseCaseError';
import { Result } from '../../../../shared/core/Result';

export namespace UpdateBookErrors {
  export class BookNotFoundError extends Result<UseCaseError> {
    constructor(bookId: string) {
      super(false, {
        message: `Couldn't find a book by bookId {${bookId}}`,
      });
    }
  }
}
