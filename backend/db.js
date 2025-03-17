const mongoose = require("mongoose");

// Adding connection string from MongoDB database as mongoURI 
const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true";

async function connectToMongo() {
    await mongoose.connect(mongoURI).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
  }
  

module.exports = connectToMongo;
