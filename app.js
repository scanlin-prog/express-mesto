const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, errors } = require('celebrate');
const { createUser, loginUser } = require('./controllers/users.js');
const auth = require('./middlewares/auth.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const { registerValidation, loginValidation } = require('./middlewares/validation.js');
const userRoutes = require('./routes/users.js');
const cardRoutes = require('./routes/cards.js');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate(registerValidation), createUser);
app.post('/signin', celebrate(loginValidation), loginUser);

app.use(auth);

app.use('/', userRoutes);
app.use('/', cardRoutes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
});

app.listen(PORT);