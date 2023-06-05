const router = require('express').Router();

const {
  getUsersInfo,
  getUserInfoId,
  createUserInfo,
  changeUserAvatar,
  changeUserInfo,
} = require('../controllers/users');

// Пользователи:
router.get('/', getUsersInfo);
// Конкретный пользователь по его ID:
router.get('/:userId', getUserInfoId);
// Создание пользователя:
router.post('/', createUserInfo);
// Редактирование аватара пользователя:
router.patch('/me/avatar', changeUserAvatar);
// Редактирование данных пользователя:
router.patch('/me', changeUserInfo);

module.exports = router;
