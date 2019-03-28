var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    fname   : String,
    lname   : String,
    email   : String,
    username: String,
    password: String,
    phone   : String,
    dp      : String,
    dob     : Date,
    place   : String,
});

userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);