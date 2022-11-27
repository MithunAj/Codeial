const { model } = require("mongoose")
const User = require('../models/user');

module.exports.userProfile = function(req,res){
    res.end('<h1> Its an user profile page </h1>')
}

module.exports.userAccount = function(req,res){
    res.end('<h1> This is the user Account page</h1>')
}

// render the signIn page
module.exports.userSignIn = function(req,res){
    res.render('user_SignIn',{
        title : 'Codeial | SignIn'
    });
}

// render the signUp page
module.exports.userSignUp = function(req,res){
    res.render('user_SignUp',{
        title : 'Codeial | SignUp'
    });
}

// sign in and create the session
module.exports.createSession = function(req,res){

    
}
// getting the signup details
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in checking if the user already exits')
            return 
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('Error in creating user'); return}
                
                return res.redirect('/user/Signin');
            })
        }else{
            return res.redirect('back');
        }

    })
}
