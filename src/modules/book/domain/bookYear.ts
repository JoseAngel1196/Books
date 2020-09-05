import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

interface BookYearProps {
  value: string;
}

export class BookYear extends ValueObject<BookYearProps> {
  public static minLength: number = 4;
  public static maxLength: number = 4;
  public static regex: RegExp = /^\d{4}$/;

  get value(): string {
    return this.props.value;
  }

  /**
   *
   */
  constructor(props: BookYearProps) {
    super(props);
  }

  public static create(props: BookYearProps): Result<BookYear> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'year');

    if (!nullGuardResult.succeeded) {
      return Result.fail<BookYear>(nullGuardResult.message);
    }

    const minGuardResult = Guard.againstAtLeast(
      this.minLength,
      props.value,
      'year'
    );
    const maxGuardResult = Guard.againstAtMost(
      this.maxLength,
      props.value,
      'year'
    );

    if (!minGuardResult.succeeded) {
      return Result.fail<BookYear>(minGuardResult.message);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<BookYear>(maxGuardResult.message);
    }

    if (!this.regex.test(props.value)) {
      return Result.fail<BookYear>('Not a valid year');
    }

    return Result.ok<BookYear>(new BookYear(props));
  }
}
