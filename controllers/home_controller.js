const Post = require('../models/posts');

module.exports.home = function(req,res){

    // Post.find({},function(err,post){


    //     return res.render('home',{
    //         title : "Codeail | Home",
    //         posts : post
    //     })

    // })
    
    //populating the user object for each post
        if(req.isAuthenticated()){
            Post.find({user:req.user._id}).populate('user').exec(function(err,posts){

                return res.render('home',{
                    title : "Codeail | Home",
                    posts : posts
                })

            })
    
        }else{

            return res.render('home',{
                title : "Codeail | Home",
                posts : null
            })
        }   
    }