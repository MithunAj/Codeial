const express = require('express');
const router = express.Router();
const user = require('../controllers/users_controller');
const passport = require('passport');


router.get('/',passport.checkAuthentication,function(req,res){
    return res.redirect('users/profile');
})

 router.get('/profile',passport.checkAuthentication,user.userProfile);

router.get('/profile/:id',passport.checkAuthentication,user.userProfile);

router.post('/update/:id',passport.checkAuthentication,user.update);

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