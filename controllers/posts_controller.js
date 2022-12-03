const Post = require('../models/posts');
const comment = require('../models/comments');
;
module.exports.posts = function(req,res){
    res.end('<h1> This is posts page... haha</h1>')
}

module.exports.create = async function(req,res){
    
    try {

        await Post.create({
            content : req.body.content,
            user: req.user._id
        });
        req.flash('success','Post created!')
        return res.redirect('back');
    } catch (error) {
        req.flash('error',error);
        console.log("Error occured",error);
        return;
    }

    

    // old code without try catch and async await
    // Post.create({
    //     content : req.body.content,
    //     user: req.user._id
    // },function(err,post){
    //     if(err){
    //         console.log('Error in creating the post');
    //     }

    //     return res.redirect('back');
    // })

}


module.exports.destroy = async function(req,res){

    try {
        let post = await Post.findById(req.params.id);
     
        if(post.user == req.user.id){
            post.remove();
            await comment.deleteMany({
                post : req.params.id
            })
            req.flash('success','Post and associated comments deleted!')
            return res.redirect('back');
        }else{
            req.flash('error','You cannot delete the post!!')
            return res.redirect('back');
        }    
    
    } catch (error) {
        console.log("Error occure",error);
        return;
    }
    

    // Post.findById(req.params.id,function(err,post){
    //     // .id means coverting the object id to string
    //     if(post.user == req.user.id){
    //         post.remove();
    //         comment.deleteMany({
    //             post : req.params.id
    //         },function(err){
    //             if(err){
    //                 console.log(err);
    //             }
    //             return res.redirect('back');
    //         })
    //     }else{

    //     return res.redirect('back');
    //     }
    // });
    
}