const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails',function(job,done){
    // console.log('email worker is processing',job);

    commentsMailer.newComment(job.data);

    done();

})