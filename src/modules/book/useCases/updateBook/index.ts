import { UpdateBook } from './UpdateBook';
import { bookRepo } from '../../repos';

const updateBook = new UpdateBook(bookRepo);

export { updateBook };
