const Card = require('../models/card');

module.exports.getCards = (req, res) => Card.find({})
  .populate(['owner', 'likes'])
  .then((cards) => res.status(200).send(cards))
  .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.status(200).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => Card.findByIdAndRemove(req.params.cardId)
  .orFail(new Error('CastError'))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.message === 'CastError') {
      return res.status(404).send({ message: 'Карточка или пользователь не найден' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  });

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true })
  .then((card) => res.status(200).send(card))
  .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true })
  .then((card) => res.status(200).send(card))
  .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));