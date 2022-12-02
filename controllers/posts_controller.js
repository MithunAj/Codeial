const Post = require('../models/posts');


module.exports.posts = function(req,res){
    res.end('<h1> This is posts page... haha</h1>')
}

module.exports.create = function(req,res){
    
    Post.create({
        content : req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){
            console.log('Error in creating the post');
        }

        return res.redirect('back');
    })

}