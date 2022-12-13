const mongoose = require('mongoose');
// const user = require('./user');

const friendshipSchema = new mongoose.Schema({
    from_user:{
        type: mongoose.Schema.ObjectId,
        ref : 'user'
    },
    to_user:{
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    }
},{
    timestamps: true
})

const Friendships = new mongoose.model('Friendships',friendshipSchema);
module.exports = Friendships;