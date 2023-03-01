const express = require('express');
const router = express.Router();

const controllers = require('../controllers');

const authMiddleware = require('../middleware/auth.middleware')

router.post('/login', controllers.user.login);
router.get('/verify', authMiddleware, controllers.user.verify);
router.get('/logout', authMiddleware, controllers.user.logout);

module.exports = router;