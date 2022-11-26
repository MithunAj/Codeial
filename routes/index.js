const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller')
//console.log('router package is loaded');

router.get('/home',homeController.home);

module.exports = router;