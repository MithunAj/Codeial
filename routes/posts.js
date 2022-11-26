const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts_controller')

router.get('/',posts.posts);



module.exports = router;