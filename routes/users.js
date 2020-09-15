const fs = require('fs');
const path = require('path');
const usersRouter = require('express').Router();

const usersFile = path.join('.', 'data', 'users.json');

usersRouter.get('/users', (req, res) => {
  fs.readFile(usersFile, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.send(JSON.parse(data));
  });
});

usersRouter.get('/users/:_id', (req, res) => {
  fs.readFile(usersFile, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const user = JSON.parse(data).find((item) => item._id === req.params._id);
    if (!user) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    res.send(user);
  });
});

module.exports = usersRouter;