const Like = require('../models/likes');
const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.toggleLike = async function(req,res){
    try {
        
       // likes/toggle/id:asdbn&type=(Post or comment) 
        let likeable;
        let deleted = false;

        if(req.query.type=='posts'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if already there exists an like by that user in the like collection

        let existingLike = await Like.findOne({
            user: req.user._id,
            onModel: req.query.type,
            likeable: req.query.id
        })

        // if the like already exists then we should remove it from 2 places
        if(existingLike){
            likeable.likes.pull(existingLike);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }else{
            // if the like is not present already, then add one to the likes collectio and likes array of the likeable object
            let newLike = await Like.create({
               user: req.user._id,
               onModel: req.query.type,
               likeable: req.query.id 
             })

             likeable.likes.push(newLike); // here the object used for pushing in the lecture is like._id;
             likeable.save();
        }

        return res.json(200,{
            message: 'Request successful',
            data:{
                deleted:deleted
            }
        })

    } catch (error) {
        console.log(error, 'An error occured during toggling the like');
        return res.json(500,{
            message : 'Internal server error'
        })
    }
}