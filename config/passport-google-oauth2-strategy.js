const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// telling passport to use new strategy for google OAuth.
passport.use(new googleStrategy({
        clientID : '659706701758-ccptcjv8kur4qio38ka6s36vo2rur1d2.apps.googleusercontent.com',
        clientSecret : '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',
        callbackURL : 'http://localhost:8000/users/auth/google/callback'
    },
        function(accessToken,refreshToken,profile,done){

            // finding the user with the profile object sent from google.
            User.findOne({email : profile.emails[0].value}).exec(function(err,user){
                if(err){
                    console.log('Error finding the user with google strategy', err);
                    return;
                }

                if(user){
                    // if the user is already signed up with us, just execute the call back function with user.
                    done(null,user);
                }else{
                    // if not present, create the user with the information available in the profile object. Acting as a sign up
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')
                    },function(err,user){
                        if(err){
                            console.log('Error creating the user with google strategy', err);
                            return; 
                        }

                        return done(null,user);
                    })
                }
                
            })
        }
));

module.exports = passport;
