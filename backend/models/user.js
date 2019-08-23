/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Fri Aug 23 2019
 * Description: 
 * MongoDB user model with uniqueness vailidator.
 * *
 */
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); 

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String},
  surname: {type: String},
  number: {type: String, unique: true},
  address: {type: String},
  hnumber: {type: String},

  bankAccount: {type: String, unique:true, partialFilterExpression: {bankAccount: {$type: 'String'}}}, 
  //https://stackoverflow.com/questions/35755628/unique-index-in-mongodb-3-2-ignoring-null-values
 
  dateRegistered: {type: String, required: true},
  lastLogin: {type: String, required: true}
});

userSchema.plugin(uniqueValidator); 
module.exports = mongoose.model('User',userSchema);
