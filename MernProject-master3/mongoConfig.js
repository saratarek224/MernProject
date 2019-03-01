// // const mongoose = require('mongoose');

// // const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/project';

// // mongoose.connect(MONGO_URL, {
// //     autoReconnect: true,
// //     reconnectTries: Number.MAX_VALUE,
// //     useNewUrlParser: true,
// // }, (err) => {
// //     if (!err) console.log(`started mongodb connection...`)
// // })node   



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://root:root@cluster0-4jhll.mongodb.net/project?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     if(!err){
//   const collection = client.db("test").collection("devices");
//   console.log(`started mongodb connection...`);}
//  // perform actions on the collection object
//  // client.close();
// });


const mongoose = require("mongoose");

// //const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/project";


// const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/project';

// mongoose.connect(MONGO_URL, {
//     autoReconnect: true,
//     reconnectTries: Number.MAX_VALUE,
//     useNewUrlParser: true,
// }, (err) => {
//     if (!err) console.log(`started mongodb connection...`)
// })

///////////// Online MONGODB //////////////////////

const MONGO_URL =
    process.env.MONGO_URL ||
    "mongodb+srv://root:root@ahmedelshall-cqaq5.mongodb.net/sara?retryWrites=true";

mongoose.connect(
  MONGO_URL,
  {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true
  },
  err => {
    if (!err) console.log(`started mongodb connection...`);
  }
);