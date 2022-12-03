const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments_controller');
const { route } = require('./users');
const passport = require('../config/passport-local-strategy')

router.post('/create',commentController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentController.destroy);

module.exports = router;