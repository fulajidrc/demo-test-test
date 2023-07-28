const express = require('express');
const router = express.Router();

const userMiddleware = require('../middleware/user.middleware')
const authMiddleware = require('../middleware/auth.middleware')
const managerMiddleware = require('../middleware/manager.middleware')
const controllers = require('../controllers');

router.get('/', authMiddleware, controllers.leave.getAll);
router.post('/',userMiddleware, controllers.leave.create);
router.get('/dashboard',userMiddleware, controllers.leave.dashboard);
router.put('/:id',userMiddleware,  controllers.leave.update);

router.delete('/:id',userMiddleware,  controllers.leave.delete);
router.get('/:id',authMiddleware, controllers.leave.getOne);

router.put('/:id/status',managerMiddleware,  controllers.leave.statusUpdate);

module.exports = router;