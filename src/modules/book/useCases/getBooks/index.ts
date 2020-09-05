import { GetBooks } from './GetBooks';
import { bookRepo } from '../../repos';

const getBooks = new GetBooks(bookRepo);

export { getBooks };
