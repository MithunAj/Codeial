const { Router } = require('express');
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')
//console.log('router package is loaded');

router.get('/home',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
//router.get('/user',require('./users'));
// for any further routes, use router.use('/routeName',require('./route file'));

router.use('/api',require('./api'));

module.exports = router;