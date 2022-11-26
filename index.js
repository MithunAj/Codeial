const express = require('express');
const port = 8000;
const app = express();

app.use('/',require('./routes'));




app.listen(port,function(err){
    if(err){
        console.log(`There was error when trying to listen ${err}`);
        return;
    }

    console.log(`The server is listening on port : ${port}`);
})



