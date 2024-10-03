const router = require('express').Router()
const { register, login ,validateUserReg ,validateUserLogin  } = require('../controllers/authController');



router.post('/register', validateUserReg ,register);
router.post('/login', validateUserLogin , login);

module.exports = router ;