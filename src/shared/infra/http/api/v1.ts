// Imports
import express from 'express';

// App Imports
import { bookRouter } from '../../../../modules/book/infra/routes';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: "We're up! " });
});

v1Router.use('/books', bookRouter);

export { v1Router };
