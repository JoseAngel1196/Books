import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

interface BookDescriptionProps {
  value: string;
}

export class BookDescription extends ValueObject<BookDescriptionProps> {
  public static maxLength: number = 10000;

  get value(): string {
    return this.props.value;
  }

  /**
   *
   */
  constructor(props: BookDescriptionProps) {
    super(props);
  }

  public static create(props: BookDescriptionProps): Result<BookDescription> {
    const nullGuardResult = Guard.againstNullOrUndefined(
      props.value,
      'description'
    );

    if (!nullGuardResult.succeeded) {
      return Result.fail<BookDescription>(nullGuardResult.message);
    }

    const maxGuardResult = Guard.againstAtMost(
      this.maxLength,
      props.value,
      'description'
    );

    if (!maxGuardResult.succeeded) {
      return Result.fail<BookDescription>(maxGuardResult.message);
    }

    return Result.ok<BookDescription>(new BookDescription(props));
  }
}
