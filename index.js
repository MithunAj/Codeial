const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
require('./config/view_helper')(app)
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy')
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
// setting up chat server to be used with socket.IO
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(3000);
console.log('Chat server is listening on port : 3000')
const path = require('path');
//setting up sassMiddleware to compiles as soon as the server boots up
if(env.name=='development'){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.assest_path,'scss'),
        dest: path.join(__dirname,env.assest_path,'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

app.use(bodyParser.urlencoded());
//saying the app use the cookieParser package
app.use(cookieParser());

app.use(express.static(env.assest_path  ));
// make route uploads path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));
//extract the style and scripts from subpages to the layout pages head
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayout);

// set up view engine 
app.set('view engine','ejs');
app.set('views','./views');

//mongo store is used to store the session cookie in the DB
app.use(session({
    name : 'Codeial',
    // TODO change the secrete before deploying
    secret : env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
        },
        function(err){
        console.log(err || "connect-mongo setup ok!")
        })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
//use express router
app.use('/',require('./routes'));

// making the server listen on port
app.listen(port,function(err){
    if(err){
        console.log(`There was error when trying to listen ${err}`);
        return;
    }

    console.log(`The server is listening on port : ${port}`);
})



