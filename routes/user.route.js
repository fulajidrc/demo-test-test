const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

router.get('/', controllers.user.getAll);
router.post('/', controllers.user.create);
router.put('/:id', controllers.user.update);

router.delete('/:id', controllers.user.delete);
router.get('/:id', controllers.user.getOne);

module.exports = router;