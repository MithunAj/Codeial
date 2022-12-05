const Post = require('../models/posts');
const { populate } = require('../models/user');
const user = require('../models/user');

module.exports.home = async function(req,res){
    try {
        //populating the user object for each post

        let posts =   await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comment',
                populate:{
                    path : 'user'
                }
            })


   
        let users =   await  user.find({});

 
        return res.render('home',{
            title : "Codeail | Home",
            posts : posts,
            all_users : users
        })
        
    } catch (error) {
        console.log("Error occured",error)
    }
    
            
}