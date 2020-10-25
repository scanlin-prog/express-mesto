const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.getCards = (req, res, next) => Card.find({})
  .populate(['owner', 'likes'])
  .then((cards) => res.status(200).send(cards))
  .catch(next);

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.status(200).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => Card.findByIdAndRemove(req.params.cardId)
  .orFail(new Error('CastError'))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.message === 'CastError') {
      throw new NotFoundError('Карточка или пользователь не найден');
    }
  })
  .catch(next);

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true })
  .then((card) => res.status(200).send(card))
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true })
  .then((card) => res.status(200).send(card))
  .catch(next);