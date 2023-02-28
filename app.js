import express from 'express';
import { dbInit } from './db/Sequelize.js';
import cors from 'cors';
import morgan from 'morgan';
import { pageRouter } from './Routes/FrontEnd/index.js';
import { UserRouter } from './Routes/Users/index.js';

const app = express();
const port = process.env.PORT || 9001;

app.use(
  cors({
    origin: '*',
  })
);

app
  .use(express.json())
  .use('/public', express.static('./public'))
  .use(morgan('dev'));

dbInit();

app.get('/', (req, res) => {
  res.send('hello, welcome to maple-rideshare backend by DMServices');
});

app.use('/front-end', pageRouter);
app.use('/user', UserRouter);

app.listen(port, () =>
  console.log(`our server is running on http://localhost:${port}`)
);
