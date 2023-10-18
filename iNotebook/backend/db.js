const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&appnameMongoDB%20Compass&directConnection=true&ssl=false";
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI);
    console.log("Connected to MongoDB Successfully");
    
  }



module.exports = connectToMongo;
