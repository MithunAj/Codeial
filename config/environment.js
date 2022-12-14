const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path: logDirectory
})

const development = {
    name : 'development',
    assest_path: './assets',
    session_cookie_key:'Blah something',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'project.codeial',
            pass: 'ludimjqbywfovdga'
        }
    },
    google_client_id : '659706701758-ccptcjv8kur4qio38ka6s36vo2rur1d2.apps.googleusercontent.com',
    google_client_secret : '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',
    google_callback_url : 'http://localhost:8000/users/auth/google/callback',
    jwt_key : 'codeial',
    morgan:{
        mode: 'dev',
        options:{
            stream: accessLogStream
        }
    }
}

const production = {
    name : 'production',
    assest_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url : process.env.CODEIAL_GOOGLE_CALL_BACK_URL,
    jwt_key : process.env.CODEIAL_JWT_SECRET_KEY,
    morgan:{
        mode: 'combined',
        options:{
            stream: accessLogStream
        }
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development :eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports = development;