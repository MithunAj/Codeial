const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment) =>{
    // console.log('inside new comment mailer');
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:'project.codeial@gmail.com',
        to: comment.user.email,
        subject: 'New comment added',
        html: htmlString
    },(err,info)=>{
        if(err){
            console.log(err,'An error occured during sending mail')
            return;
        }
        // console.log('Message sent', info);
        return;
    })
}