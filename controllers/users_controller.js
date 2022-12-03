const { model } = require("mongoose")
const User = require('../models/user');

module.exports.userProfile = function(req,res){
    if(req.params.id){
        User.findById(req.params.id,function(err,user){
            return res.render('user_Profile',{
                title : 'Codeial | Users',
                profile_user : user
            });
        })
    }else{
        return res.render('user_Profile',{
            title : 'Codeial | My Profile',
            profile_user : req.user
        })
    }   
    
}


module.exports.update = function(req,res){
    if(req.params.id == req.user.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            user.save();
            return res.redirect('/home');
        })
    }else{
        return res.status(401).send('Unauthorized');
    }
}


module.exports.userAccount = function(req,res){
    res.end('<h1> This is the user Account page</h1>')
}

// render the signIn page
module.exports.userSignIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('profile');
        
    }

    res.render('user_SignIn',{
        title : 'Codeial | SignIn'
    });
}

// render the signUp page
module.exports.userSignUp = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('profile');
        
    }

    res.render('user_SignUp',{
        title : 'Codeial | SignUp'
    });
}

// getting the signup details
module.exports.create = async function(req,res){
    try {
	if(req.body.password != req.body.confirm_password){
	        return res.redirect('back');
	    }
	    // new code with async await and try catch
	
	    let user = await User.findOne({email:req.body.email});
	
	    if(!user){
	        await User.create(req.body);
	        return res.redirect('/users/Signin');
	    }else{
	        return res.redirect('back');
	    }
    } catch (error) {
        console.log('Error occured',error);
        return;
    }

    // old code 

    // User.findOne({email:req.body.email},function(err,user){
    //     if(err){
    //         console.log('Error in checking if the user already exits')
    //         return 
    //     }

    //     if(!user){
    //         User.create(req.body,function(err,user){
    //             if(err){console.log('Error in creating user'); return}
                
    //             return res.redirect('/users/Signin');
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }

    // })
}

// sign in and create the session
module.exports.createSession = function(req,res){
    return res.redirect('/home');
    
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err, 'An error happened while signing out');
        }

        return res.redirect('/home');
    });
}