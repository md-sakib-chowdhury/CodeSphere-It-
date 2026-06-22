const router = require('express').Router();
const { login, register, getMe, checkSetup } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
router.get('/check-setup', checkSetup);
router.post('/login', login);
router.post('/register', register);
router.get('/me', protect, getMe);
module.exports = router;