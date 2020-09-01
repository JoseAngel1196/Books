// Imports
const { Client } = require('pg');

require('dotenv').config();

const {
  BOOKS_DB_USER,
  BOOKS_DB_PASS,
  BOOKS_DB_HOST,
  BOOKS_DB_DEV_DB_NAME,
} = process.env;

const connection = new Client({
  host: BOOKS_DB_HOST,
  user: BOOKS_DB_USER,
  password: BOOKS_DB_PASS,
  port: 5432,
});

connection.connect((err) => {
  if (err) throw err;
  connection.query(`CREATE DATABASE ${BOOKS_DB_DEV_DB_NAME}`, (err) => {
    if (err && err.code === 'ER_DB_CREATE_EXISTS') {
      console.log('Db already created');
      process.exit(0);
    }

    if (err) {
      throw err;
    }

    console.log('Created db');
    process.exit(0);
  });
});
