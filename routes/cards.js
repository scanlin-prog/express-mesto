const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { creatCardValidation, cardIdValidation } = require('../middlewares/validation');

router.get('/cards', getCards);

router.post('/cards', celebrate(creatCardValidation), createCard);

router.delete('/cards/:cardId', celebrate(cardIdValidation), deleteCard);

router.put('/cards/:cardId/likes', celebrate(cardIdValidation), likeCard);

router.delete('/cards/:cardId/likes', celebrate(cardIdValidation), dislikeCard);

module.exports = router;