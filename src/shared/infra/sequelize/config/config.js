require('dotenv').config();
const Sequelize = require('sequelize');

const {
  BOOKS_DB_USER,
  BOOKS_DB_PASS,
  BOOKS_DB_HOST,
  BOOKS_DB_DEV_DB_NAME,
  NODE_ENV,
} = process.env;

const databaseCredentials = {
  development: {
    username: BOOKS_DB_USER,
    password: BOOKS_DB_PASS,
    database: BOOKS_DB_DEV_DB_NAME,
    host: BOOKS_DB_HOST,
    dialect: 'postgres',
  },
};

const { username, password, database, host, dialect } = databaseCredentials[
  NODE_ENV
];

module.exports = databaseCredentials;

console.log(`[DB]: Connecting to the database in ${NODE_ENV} mode.`);

module.exports.connection = new Sequelize(database, username, password, {
  host,
  dialect,
  port: 5432,
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});
