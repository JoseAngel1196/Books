// Imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

// App Imports
import { v1Router } from './api/v1';
import { startGraphQLServer } from './graphql/server';

const origin = {
  origin: '*',
};

const app = express();

startGraphQLServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));


app.use('/api/v1', v1Router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`[App]: Listening on port ${port}`);
});
