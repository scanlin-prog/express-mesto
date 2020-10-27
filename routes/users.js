const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUsers, getUser, getCurrentUser, updateUser, updateUserAvatar,
} = require('../controllers/users');
const { updateUserValidation, updateUserAvatarValidation, userIdValidation } = require('../middlewares/validation');

router.get('/users', getUsers);

router.get('/users/:_id', celebrate(userIdValidation), getUser);

router.get('/users/me', celebrate(userIdValidation), getCurrentUser);

router.patch('/users/me', celebrate(updateUserValidation), updateUser);

router.patch('/users/me/avatar', celebrate(updateUserAvatarValidation), updateUserAvatar);

module.exports = router;