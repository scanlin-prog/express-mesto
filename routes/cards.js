const fs = require('fs');
const path = require('path');
const cardsRouter = require('express').Router();

const cardsFile = path.join('.', 'data', 'cards.json');

cardsRouter.get('/cards', (req, res) => {
  fs.readFile(cardsFile, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.send({ message: 'Ошибка' });
      return;
    }

    res.send(JSON.parse(data));
  });
});

module.exports = cardsRouter;