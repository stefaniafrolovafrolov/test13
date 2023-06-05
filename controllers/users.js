const User = require('../models/user');

// Получение всех пользователей из базы данных
module.exports.getUsersInfo = (_, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res
      .status(500)
      .send({
        message:
            'Внутренняя ошибка сервера 500, сервер не смог обработать запрос',
      }));
};

// Пользователь по его уникальному ID
module.exports.getUserInfoId = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Передача некорректных данных при поиске пользователя',
        });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Пользователь c указанным _id не найден',
        });
      }

      return res
        .status(500)
        .send({
          message:
            'Внутренняя ошибка сервера 500, сервер не смог обработать запрос',
        });
    });
};

// Создание нового пользователя
module.exports.createUserInfo = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message:
            'Передача некорректных данных при создания нового пользователя.',
        });
      } else {
        res
          .status(500)
          .send({
            message:
              'Внутренняя ошибка сервера 500, сервер не смог обработать запрос',
          });
      }
    });
};

// Редактирование аватара пользователя
module.exports.changeUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({
          message:
            'Передача некорректных данных при попытке обновления аватара',
        });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Данный пользователь не был найден',
        });
      }

      return res
        .status(500)
        .send({
          message:
            'Внутренняя ошибка сервера 500, сервер не смог обработать запрос',
        });
    });
};

// Редактирование уже существующих данных пользователя
module.exports.changeUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).send({
          message:
            'Передача некорректных данных при попытке обновления профиля',
        });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({
          message: 'Данный пользователь не был найден',
        });
      }

      return res
        .status(500)
        .send({
          message:
            'Внутренняя ошибка сервера 500, сервер не смог обработать запрос',
        });
    });
};
