import { CreateBookUseCase } from './CreateBookUseCase';
import { bookRepo } from '../../repos';
import { CreateBookController } from './CreateBookController';

const createBookUseCase = new CreateBookUseCase(bookRepo);
const createBookController = new CreateBookController(createBookUseCase);

export { createBookUseCase, createBookController };
