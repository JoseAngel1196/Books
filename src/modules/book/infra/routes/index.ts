import express from 'express';
import { createBookController } from '../../useCases/createBook';

const bookRouter = express.Router();

bookRouter.post('/', (req, res) => createBookController.execute(req, res));

export { bookRouter };
