// Imports
import express from 'express';

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
  return res.json({ message: "We're up! " });
});

export { v1Router };
