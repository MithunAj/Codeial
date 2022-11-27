const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')
//console.log('router package is loaded');

router.get('/home',homeController.home);
router.use('/user',require('./users'));
router.use('/posts',require('./posts'));
//router.get('/user',require('./users'));
// for any further routes, use router.use('/routeName',require('./route file'));

module.exports = router;