import { Entity } from '../../../shared/domain/Entity';
import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { BookId } from './bookId';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';
import { BookTitle } from './bookTitle';
import { BookYear } from './bookYear';
import { BookDescription } from './bookDescription';

export interface BookProps {
  title: BookTitle;
  year: BookYear;
  bookDescription: BookDescription;
}

export class Book extends Entity<BookProps> {
  /**
   *
   */
  private constructor(props: BookProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get bookId(): BookId {
    return BookId.create(this._id).getValue();
  }

  get title(): BookTitle {
    return this.props.title;
  }

  get year(): BookYear {
    return this.props.year;
  }

  get bookDescription(): BookDescription {
    return this.props.bookDescription;
  }

  public static create(props: BookProps, id?: UniqueEntityID): Result<Book> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.bookDescription, argumentName: 'description' },
      { argument: props.title, argumentName: 'title' },
      { argument: props.year, argumentName: 'year' },
    ]);

    if (!nullGuard.succeeded) {
      return Result.fail<Book>(nullGuard.message);
    } else {
      const book = new Book(props, id);

      return Result.ok<Book>(book);
    }
  }
}
