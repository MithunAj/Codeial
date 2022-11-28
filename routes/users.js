const express = require('express');
const router = express.Router();
const user = require('../controllers/users_controller');
const passport = require('passport');


router.get('/',function(req,res){
    return res.render('users',{
        title : 'Users'
    })
})

router.get('/profile',passport.checkAuthentication,user.userProfile);

router.get('/account',user.userAccount);

router.get('/SignIn',user.userSignIn);

router.get('/SignUp',user.userSignUp);

//use passport as a middleware
router.post('/create-session',passport.authenticate('local',{
    failureRedirect: '/user/signIn'
},),user.createSession);

router.post('/create',user.create);

router.get('/signOut',user.destroySession);
module.exports = router;