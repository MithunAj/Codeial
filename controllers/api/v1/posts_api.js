const Post = require('../../../models/posts');
const comment = require('../../../models/comments');
module.exports.index = async function(req,res){

    let posts =   await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comment',
                populate:{
                    path : 'user'
                }
            })

    return res.json(200,{
        message : "List of posts",
        posts : posts
    })
}


module.exports.destroy = async function(req,res){

    try {
        let post = await Post.findById(req.params.id);
        
        if(post.user == req.user.id){
        post.remove();
        
        await comment.deleteMany({
            post : req.params.id
        })

        return res.json(200,{
            message : " The post and associated comments was successfully deleted"
        }) }
        else{ 
            return res.json(401,{
                message: 'You cannot delete this post!'
            })
        }; 
    
    } catch (error) {
        return res.json(500,{
            message : 'Internal sever error'
        });
    }
}