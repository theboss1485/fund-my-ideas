
// This file sets up the connection string for the MongoDB database.
require('dotenv').config()
const mongoose = require('mongoose');

let atlasConnectionString = undefined

if(process.env.MONGODB_URI){

    atlasConnectionString = encodeURI(process.env.MONGODB_URI)
}

mongoose.connect(atlasConnectionString || process.env.LOCALHOST_DB_CONNECTION_STRING);

module.exports = mongoose.connection;