const { Joi } = require('celebrate');

const regexUrl = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/i;
const regexPassword = /[a-zA-Z0-9]{3,30}/;

const registerValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().regex(regexUrl),
    email: Joi.string().required().email(),
    password: Joi.string().regex(regexPassword).required(),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().regex(regexPassword).required(),
  }),
};

const updateUserValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

const updateUserAvatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(regexUrl),
  }),
};

const creatCardValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(regexUrl),
  }),
};

module.exports = {
  regexUrl,
  registerValidation,
  loginValidation,
  updateUserValidation,
  updateUserAvatarValidation,
  creatCardValidation,
};