const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authenitcation using passport.
passport.use(new LocalStrategy({
    usernameField : 'email'
    },
    function(email,password,done){
        // find a user and establish the identity
        User.findOne({email : email}, function(err,user){
            if(err){
                console.log('Error in finding the user -> Passport')
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid username or password');
                return done(null,false);
            }

            return done(null,user);

        })
    }
));


// serialize the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})



// deseialize the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding the user -> Passport')
            return done(err);
        }

        return done(null,user);
    })
})

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // passport puts an method on to the request called isAuthenticated
    // if the user is signed in pass on the req to next function (controller actions)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not authenticated
    return res.redirect('signin');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;