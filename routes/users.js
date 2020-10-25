const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers, getUser, updateUser, updateUserAvatar,
} = require('../controllers/users');
const { updateUserValidation, updateUserAvatarValidation } = require('../middlewares/validation');

router.get('/users', getUsers);

router.get('/users/:_id', getUser);

router.patch('/users/me', celebrate(updateUserValidation), updateUser);

router.patch('/users/me/avatar', celebrate(updateUserAvatarValidation), updateUserAvatar);

module.exports = router;