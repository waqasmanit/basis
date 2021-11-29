const express = require('express')
const signupController = require('../controller/signupController')

const router = express.Router();

router.post('/signup', signupController.signup)
router.post('/verify',signupController.verify)
router.post('/createUser',signupController.signupUser)
router.post('/loginUser',signupController.loginUser)

module.exports = router;