import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

interface BookTitleProps {
  value: string;
}

export class BookTitle extends ValueObject<BookTitleProps> {
  public static minLength: number = 15;
  public static maxLength: number = 30;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: BookTitleProps) {
    super(props);
  }

  public static create(props: BookTitleProps): Result<BookTitle> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'title');

    if (!nullGuardResult.succeeded) {
      return Result.fail<BookTitle>(nullGuardResult.message);
    }

    const minGuardResult = Guard.againstAtLeast(
      this.minLength,
      props.value,
      'title'
    );
    const maxGuardResult = Guard.againstAtMost(
      this.maxLength,
      props.value,
      'title'
    );

    if (!minGuardResult.succeeded) {
      return Result.fail<BookTitle>(minGuardResult.message);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<BookTitle>(maxGuardResult.message);
    }

    return Result.ok<BookTitle>(new BookTitle(props));
  }
}
