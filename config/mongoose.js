const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error in opening the connection to MongoDB"));

db.once('open',function(){
    console.log('Connected to Mongo:DB !')
});

module.exports = db;