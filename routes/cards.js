const router = require('express').Router();

const {
  getInitialCards,
  addCard,
  deleteCard,
  addLikeToCard,
  deleteLikeFromCard,
} = require('../controllers/cards');

// Маршрут для получения всех карточек:
router.get('/', getInitialCards);
// Маршрут для создания новой карточки:
router.post('/', addCard);
// Маршрут для удаления карточки:
router.delete('/:cardId', deleteCard);
// Маршрут для добавления лайка на карточку:
router.put('/:cardId/likes', addLikeToCard);
// Маршрут для удаления лайка с карточки:
router.delete('/:cardId/likes', deleteLikeFromCard);

module.exports = router;
