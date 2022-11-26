const express = require('express');
const router = express.Router();
const user = require('../controllers/users_controller');

router.get('/',function(req,res){
    res.end('<h1> Nothing specific </h1>')
})

router.get('/profile',user.userProfile);

router.get('/account',user.userAccount);

module.exports = router;