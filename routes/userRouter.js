const router = require('express').Router();
const { createUser, userLogin, deleteUser } = require('../controllers/userController')


router.post('/register', createUser);

router.post('/user-login', userLogin);

router.delete('/user/:username', deleteUser);

module.exports = router;