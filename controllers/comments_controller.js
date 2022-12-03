const Comment = require('../models/comments');
const Post = require('../models/posts');


module.exports.create = async function(req,res){


    try {
	let post = await Post.findById(req.body.post);
	
	    if(post){
	        let comment = await Comment.create({
	            content : req.body.content,
	            post : req.body.post,
	            user : req.user._id
	        })
	        post.comment.push(comment._id);
	        post.save();
            req.flash('success','Your comment was added!!!')
	        return res.redirect('/home');
	    }
    } catch (error) {
        console.log("Error occure,",error);
    }    

    // Post.findById(req.body.post,function(err,post){


    //     if(post){
    //         Comment.create({
    //             content : req.body.content,
    //             post : req.body.post,
    //             user : req.user._id
    //         },function(err,comment){
    //             if(err){
    //                 console.log(err, " An error occured while creating comment");
    //                 return;
    //             }
                
    //             post.comment.push(comment._id);
    //             post.save();

    //             return res.redirect('/home');

    //         })
    //     }
    // })
}


module.exports.destroy = async function(req,res){
    // new code with try catch and async await
    try {
	let comment = await Comment.findById(req.params.id);
	
	    if(comment.user == req.user.id){
	        const postId = comment.post;
	        await Post.findByIdAndUpdate(postId,{$pull : {comment:req.params.id}});
	        comment.remove();
	    }
	    req.flash('success','We just deleted your comment!!!')
	    return res.redirect('back');
    } catch (error) {
        console.log('Error',error);
        return;
    }
    // old code
    // Comment.findById(req.params.id,function(err,comment){
        
    //     if(comment.user == req.user.id){
    //         const postId = comment.post;
    //         Post.findByIdAndUpdate(postId,{$pull : {comment:req.params.id}},function(err,post){
    //             //nothing
    //         })
    //         comment.remove();
    //     }

    //     return res.redirect('back');
    // })

}