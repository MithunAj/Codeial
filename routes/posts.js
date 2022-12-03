const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts_controller')
const passport = require('../config/passport-local-strategy');
const User = require('../models/user');


router.get('/',posts.posts);

router.post('/createPost',passport.checkAuthentication,posts.create);

module.exports = router;

router.get('/destroy/:id',passport.checkAuthentication,posts.destroy);