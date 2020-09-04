import { CreateBookUseCase } from './CreateBookUseCase';
import { bookRepo } from '../../repos';
import { CreateBookController } from './CreateBookController';

const createBook = new CreateBookUseCase(bookRepo);
const createBookController = new CreateBookController(createBook);

export { createBook, createBookController };
