const { model } = require("mongoose")
const User = require('../models/user');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const friendships = require('../models/friendship');
const { kMaxLength } = require("buffer");

module.exports.userProfile = async function(req,res){
    if(req.params.id){
        let friends;
       
        let user = await User.findById(req.params.id);
        let friendship = await friendships.findOne({$or:[{from_user:req.params.id},{from_user:user.id},{from_user:user.id},{to_user:req.params.id}]});

       
        if(friendship===null){
            friends = false;
        }else{
            friends = true;
        }
 

        return res.render('user_Profile',{
            title : 'Codeial | Users',
            profile_user : user,
            friendship : friends
        });
    // }
        
    }else{
        return res.render('user_Profile',{
            title : 'Codeial | My Profile',
            profile_user : req.user
        })
    }   
    
}


module.exports.update = async function(req,res){

    if(req.params.id == req.user.id){
        try {
            const user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('Multer Error', err);
                }

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    // this is saving path of the uploaded file in the avatar field of the user
                    if(fs.existsSync(path.join(__dirname, '..' , user.avatar))){
                        fs.unlinkSync(path.join(__dirname, '..' , user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename // or directly req.file.path will also do the same thing;
                }
                user.save();
                return res.redirect('back');
            })
        } catch (error) {
            req.flash('error',error);
            return res.redirect('back');
        }
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
            req.flash('error','Passwords do not match')
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

    req.flash('success','Logged in successfully');
    return res.redirect('/home');
    
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if(err){
            console.log(err, 'An error happened while signing out');
        }
        req.flash('success','You are signed out!');
        return res.redirect('/home');
    });
}

// to add the user as a friend and create a friendship model in the collection
module.exports.addFriend = function(req,res){
    friendships.create({
        from_user: req.user.id,
        to_user:req.params.id
    }, function(err,friendship){
        if(err){
            console.log('Error in craeting the friendship',err);
            return;
        }
        // this is to push the created friendship object to the array of friendship objects in User model
        req.user.friendships.push(friendship);
        // req.user.friendships.save();
        res.redirect('/home');
    })
}

// to remove the frienship from friendship collection
module.exports.removeFriend = async function(req,res){
    
    let friendship = await friendships.findOne({$or:[{from_user:req.params.id},{to_user:req.params.id}]});
    friendship.remove();

    return res.redirect('/home');
}