/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Fri Aug 23 2019
 * Description: 
 * Express app. This module can be seen
 * as server application. Server passes
 * front-end request to this app for further
 * processing. Server only listens on port 3000
 * and processes errors. This app actualy connects
 * to MongoDB database.
 *
 */

const path = require("path"); 
const express = require("express"); 
const app = express();
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose"); 
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

mongoose.connect("mongodb://username:password@127.0.0.1:27017/ebank-users?retryWrites=true", { useNewUrlParser: true, useCreateIndex: true }).then(()=>{
console.log("Connected to MongoDB!");
}).catch(()=> {
  console.log("Not connected to MongoDB!");
});

app.use(bodyParser.json()); // all JSON data process with body-parser
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Only if frontend sends request to /images redirect it to
 * back-end folder backend/images 
 */
app.use('/images', express.static(path.join('backend/images')));
app.use('/repository/images', express.static(path.join('backend/repository/images')));
app.use('/repository/videos', express.static(path.join('backend/repository/videos')));
app.use('/repository/documents', express.static(path.join('backend/repository/documents')));

/**
 * For all inqoming requsets, set following properties in res field (allow CORS,...)
 */
app.use((req, res, next) =>{ 
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next(); // when finished go on (middleware)
});
app.use("/api/posts", postsRoutes); // for a given URL call post.js route handler 
app.use("/api/user", userRoutes);// for a given URL call user.js user handler 
module.exports = app;
