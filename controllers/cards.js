const Card = require('../models/card');

// Вывод массива карточек а страницу
module.exports.getInitialCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => res.status(500).send({
      message:
          'Произошла ошибка при запросе, на отрисовку массива карточек на страницу',
    }));
};

// Добавление новой карточки на страницу
module.exports.addCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(400).send({
          message:
            'Передача некорректных данных, при попытке добавления новой карточки на страницу.',
        });
      } else {
        res.status(500).send({
          message:
            'Внутренняя ошибка сервера 500, сервер не смог обработать запрос',
        });
      }
    });
};

// Удаление карточки из массива
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: 'Карточка c передаваемым ID не найдена' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Передача некорректных данных карточки.',
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

// Постановка лайка на карточку
module.exports.addLikeToCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(404)
          .send({ message: 'Карточка c передаваемым ID не найдена' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Передача некорректных данных при попытке поставить лайк.',
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

// Удаление лайка с карточки
module.exports.deleteLikeFromCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(404)
          .send({ message: 'Карточка c передаваемым ID не найдена' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({
          message:
            'Передача некорректных данных при попытке удаления лайка с карточки.',
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
