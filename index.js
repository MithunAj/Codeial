const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(bodyParser.urlencoded());
//saying the app use the cookieParser package
app.use(cookieParser());

app.use(express.static('./assets'));
//extract the style and scripts from subpages to the layout pages head
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayout);
//use express router
app.use('/',require('./routes'));

// set up view engine 
app.set('view engine','ejs');
app.set('views','./views');

// making the server listen on port
app.listen(port,function(err){
    if(err){
        console.log(`There was error when trying to listen ${err}`);
        return;
    }

    console.log(`The server is listening on port : ${port}`);
})



