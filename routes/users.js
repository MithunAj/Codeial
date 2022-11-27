const express = require('express');
const router = express.Router();
const user = require('../controllers/users_controller');

router.get('/',function(req,res){
    return res.render('users',{
        title : 'Users'
    })
})

router.get('/profile',user.userProfile);

router.get('/account',user.userAccount);

router.get('/SignIn',user.userSignIn);

router.get('/SignUp',user.userSignUp);

router.post('/create-session',user.createSession);

router.post('/create',user.create);
module.exports = router;