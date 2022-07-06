const { router } = require('./utils');

const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.delete('/cards/:id', deleteCard);

router.post('/cards', createCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', unlikeCard);
