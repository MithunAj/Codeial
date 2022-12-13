const Post = require('../models/posts');
const { populate } = require('../models/user');
const user = require('../models/user');
const Friends = require('../models/friendship');

module.exports.home = async function(req,res){
    try {
        //populating the user object for each post

        let posts =   await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comment',
                populate:{
                    path : 'user likes'
                }
                // populate:{
                //     path: 'likes'
                // }
            }).populate('likes');


   
        let users =   await  user.find({});
        let friends;
        // only if the user is signed in then we show the friends list
        if(req.user){
        friends = await Friends.find({$or:[{from_user:req.user.id},{to_user:req.user.id}]}).populate('from_user to_user');
        }
        // console.log(friends);
        return res.render('home',{
            title : "Codeail | Home",
            posts : posts,
            all_users : users,
            friends: friends
        })
        
    } catch (error) {
        console.log("Error occured",error)
    }
    
            
}