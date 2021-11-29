const express = require('express')
const postController = require('../controller/postController')

const router = express.Router();

router.post('/create', postController.createPost)

module.exports = router;